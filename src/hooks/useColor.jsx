import { useState, useRef, useEffect, useCallback } from 'react';
import {
  hsl,
  formatHex,
  formatHsl,
  oklch,
  formatCss,
  rgb,
  formatRgb,
  samples,
  interpolate,
  clampGamut,
} from 'culori';
import { calcAPCA, sRGBtoY } from 'apca-w3';

const useColor = () => {
  // --- VARIABLES ----------------------------------------------------------

  //NOTE - input color by user
  const inputColor = useRef(null);

  //NOTE - base color (hsl obj)
  const [hslObjColor, setHslObjColor] = useState({
    mode: 'hsl',
    h: 0,
    s: 0,
    l: 0,
  });

  //NOTE - base color (hsl string)
  const [baseColor, setBaseColor] = useState(null);

  //NOTE - base neutrals
  const [baseNeutrals, setBaseNeutrals] = useState({
    baseLight: null,
    baseDark: null,
  });

  //NOTE - base palette
  const [basePalette, setBasepalette] = useState([]);

  //NOTE - neutral palette
  const [neutralPalette, setNeutralPalette] = useState([]);

  //NOTE - primary roles
  const [primaryRoles, setPrimaryRoles] = useState({
    solid: null,
    ['on solid']: null,
    soft: null,
    ['on soft']: null,
  });

  //NOTE - neutral roles
  const [neutralRoles, setNeutralRoles] = useState({
    background: null,
    ['background alt 1']: null,
    ['background alt 2']: null,
    ['on background']: null,
    ['on background alt']: null,
    border: null,
    ['border alt']: null,
  });

  //NOTE - semantic hues
  const [semanticColors, setSemanticColors] = useState({
    error: null,
    warning: null,
    success: null,
    info: null,
  });

  // --- FUNCTIONS ----------------------------------------------------------

  //NOTE - get hsl object color
  const getHslObjColor = (color) => {
    if (!color) return null;
    return hsl(color);
  };

  //NOTE - get hsl color
  const getHslColor = (color) => {
    if (!color) return null;
    return formatHsl(color);
  };

  //NOTE - get base neutrals
  const getBaseNeutrals = (color) => {
    const fixedHue = color.h;
    const tempLight = { mode: 'hsl', h: fixedHue, s: 0.1, l: 0.98 };
    const tempDark = { mode: 'hsl', h: fixedHue, s: 0.1, l: 0.08 };

    setBaseNeutrals({
      baseLight: formatHsl(tempLight),
      baseDark: formatHsl(tempDark),
    });
  };

  //NOTE - wrap hue between 0-360
  const wrapHue = (color) => {
    const h = ((color.h % 360) + 360) % 360;
    return { ...color, h };
  };

  //NOTE - get palette
  const getBasePalette = (color, steps) => {
    const baseStep = {
      mode: 'hsl',
      h: color.h,
      s: 0.75,
      l: 0.55,
    };
    const lastTintStep = {
      mode: 'hsl',
      h: color.h + 20,
      s: 0.98,
      l: 0.98,
    };
    const lastShadeStep = {
      mode: 'hsl',
      h: color.h - 20,
      s: 0.98,
      l: 0.05,
    };

    // clamp gamut
    const clamp = clampGamut('rgb');

    // create tints
    const interpolatedTints = interpolate([lastTintStep, baseStep], 'hsl');
    const tints = samples(steps)
      .map(interpolatedTints)
      .map(clamp)
      .map((c) => wrapHue(c))
      .map(formatHsl);

    // create shades + set palette
    const interpolatedShades = interpolate([baseStep, lastShadeStep], 'hsl');
    let shades = samples(steps)
      .map(interpolatedShades)
      .map(clamp)
      .map((c) => wrapHue(c))
      .map(formatHsl);
    shades.shift();

    setBasepalette([...tints, ...shades]);
  };

  //NOTE - get semantic hues
  const getSemanticHues = (baseColor) => {
    const huesPreset = {
      error: [334, 341, 355, 5],
      warning: [15, 25, 35, 45],
      success: [80, 100, 124, 139],
      info: [180, 192, 206, 221],
    };

    // get distance between hues
    const getDistance = (h1, h2) => {
      const d = Math.abs(h1 - h2);
      return d > 180 ? 360 - d : d;
    };

    const getCorrectHue = (presetHues) => {
      return presetHues.reduce(
        (correctHue, hue) => {
          const distance = getDistance(baseColor?.h, hue);
          return distance > correctHue.distance
            ? { hue, distance }
            : correctHue;
        },
        {
          correctHue: presetHues[0],
          distance: 0,
        }
      ).hue;
    };

    const hues = {
      error: getCorrectHue(huesPreset?.error),
      warning: getCorrectHue(huesPreset?.warning),
      success: getCorrectHue(huesPreset?.success),
      info: getCorrectHue(huesPreset?.info),
    };
    console.log('hues: ', hues);
    setSemanticColors({
      error: getHslColor({ ...baseColor, h: hues?.error }),
      warning: getHslColor({ ...baseColor, h: hues?.warning }),
      success: getHslColor({ ...baseColor, h: hues?.success }),
      info: getHslColor({ ...baseColor, h: hues?.info }),
    });
  };

  // NOTE - get neutral palette
  const getneutralPalette = (baseWhite, baseDark, steps) => {
    // clamp gamut
    const clamp = clampGamut('rgb');

    const interpolateNeutrals = interpolate([baseWhite, baseDark], 'hsl');
    const neutrals = samples(steps)
      .map(interpolateNeutrals)
      .map(clamp)
      .map((c) => wrapHue(c))
      .map(formatHsl);

    setNeutralPalette(neutrals);
  };

  // find bg color with correct APCA contrast
  const findBgColor = (
    palette,
    textColor,
    minContrast,
    minContrastWithBg,
    bgColor
  ) => {
    if (!palette || !textColor) return null;

    const rgbTextColor = formatRgb(rgb(textColor));
    const rgbBgAppColor = formatRgb(rgb(bgColor));

    const validBg = palette.find((bg) => {
      const rgbBgColor = formatRgb(rgb(bg));
      const contrast = Math.abs(calcAPCA(rgbTextColor, rgbBgColor));
      const contrastWithBg = Math.abs(calcAPCA(rgbBgColor, rgbBgAppColor));
      return contrast >= minContrast && contrastWithBg >= minContrastWithBg;
    });

    return validBg || null;
  };

  // find text color with correct APCA contrast
  const findTextColor = (palette, minContrast, bgColor) => {
    if (!palette || !bgColor) return null;

    const rgbBgColor = formatRgb(rgb(bgColor));

    const validTextColor = palette?.find((textColor) => {
      const rgbTextColor = formatRgb(rgb(textColor));
      const contrast = Math.abs(calcAPCA(rgbTextColor, rgbBgColor));
      return contrast >= minContrast;
    });

    return validTextColor || null;
  };

  // get roles
  const getRoles = ({
    palette,
    textColor,
    minContrast,
    minContrastVariant,
    minContrastWithBg,
    bgColor,
    role,
    setRoleGroup,
  }) => {
    if (textColor !== null) {
      const primarySolid = findBgColor(
        palette,
        textColor,
        minContrast,
        minContrastWithBg,
        bgColor
      );
      setRoleGroup((prev) => {
        return {
          ...prev,
          [role]: primarySolid,
          [`on ${role}`]: textColor,
        };
      });
    } else if (role === 'soft') {
      const primarySoftText = findTextColor(palette, minContrast, bgColor);
      setRoleGroup((prev) => {
        return {
          ...prev,
          [role]: bgColor,
          [`on ${role}`]: primarySoftText,
        };
      });
    } else if (role === 'background') {
      // const neutralTextColor = findTextColor(palette, minContrast, bgColor);
      const neutralTextColor = 'hsl(0, 0%, 0%)';
      const neutralTextColorVariant = findTextColor(
        palette,
        minContrastVariant,
        bgColor
      );
      setRoleGroup((prev) => {
        return {
          ...prev,
          [role]: palette[0],
          [`${role} alt 1`]: palette[1],
          [`${role} alt 2`]: bgColor,
          [`on ${role}`]: neutralTextColor,
          [`on ${role} alt`]: neutralTextColorVariant,
        };
      });
    } else {
      const neutralBorderColor = findTextColor(palette, minContrast, bgColor);
      const neutralBorderVariantColor = findTextColor(
        palette,
        minContrastVariant,
        bgColor
      );
      setRoleGroup((prev) => {
        return {
          ...prev,
          [role]: neutralBorderColor,
          [`${role} alt`]: neutralBorderVariantColor,
        };
      });
    }
  };

  // --- HANDLE --------------------

  const handleClick = useCallback(() => {
    const obj = getHslObjColor(inputColor?.current.value);
    setHslObjColor(obj);
    const hsl = getHslColor(obj);
    setBaseColor(hsl);
  }, []);

  // --- USE EFFECTS ----------------
  useEffect(() => {
    if (hslObjColor?.h !== 0) {
      getBaseNeutrals(hslObjColor);
      getSemanticHues(hslObjColor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hslObjColor]);

  useEffect(() => {
    if (baseNeutrals.baseLight !== null) {
      getBasePalette(hslObjColor, 12);
      getneutralPalette(baseNeutrals?.baseLight, baseNeutrals?.baseDark, 23);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseNeutrals]);

  useEffect(() => {
    if (basePalette?.length == 0 || !baseNeutrals?.baseLight) return;

    const roleConfigs = [
      {
        palette: basePalette,
        textColor: baseNeutrals?.baseLight,
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        setRoleGroup: setPrimaryRoles,
      },
      {
        palette: basePalette,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: basePalette[3],
        role: 'soft',
        setRoleGroup: setPrimaryRoles,
      },
      {
        palette: neutralPalette,
        textColor: null,
        minContrast: 90,
        minContrastVariant: 75,
        minContrastWithBg: null,
        bgColor: neutralPalette[2],
        role: 'background',
        setRoleGroup: setNeutralRoles,
      },
      {
        palette: neutralPalette,
        textColor: null,
        minContrast: 30,
        minContrastVariant: 15,
        minContrastWithBg: null,
        bgColor: neutralPalette[2],
        role: 'border',
        setRoleGroup: setNeutralRoles,
      },
    ];

    roleConfigs.forEach(getRoles);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePalette, baseNeutrals]);

  return {
    inputColor,
    baseColor,
    baseNeutrals,
    basePalette,
    primaryRoles,
    neutralPalette,
    neutralRoles,
    semanticColors,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
