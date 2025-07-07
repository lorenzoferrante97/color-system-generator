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

  //NOTE - semantic palettes
  const [semanticPalette, setSemanticPalette] = useState({
    error: [],
    warning: [],
    success: [],
    info: [],
  });

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

  //NOTE - semantic roles
  const [semanticRoles, setSemanticRoles] = useState({
    error: {
      solid: null,
      ['on solid']: null,
      soft: null,
      ['on soft']: null,
    },
    warning: {
      solid: null,
      ['on solid']: null,
      soft: null,
      ['on soft']: null,
    },
    success: {
      solid: null,
      ['on solid']: null,
      soft: null,
      ['on soft']: null,
    },
    info: {
      solid: null,
      ['on solid']: null,
      soft: null,
      ['on soft']: null,
    },
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

  //NOTE - round oklch decimals
  const round = (num, decimals = 4) =>
    Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

  //NOTE - convert to oklch
  const convertToOklch = (palette) => {
    if (!palette) return null;
    return palette?.map((color) => {
      const oklchColor = oklch(color);
      return `oklch(${round(oklchColor?.l)} ${round(oklchColor?.c)} ${round(oklchColor?.h)}`;
    });
  };

  //NOTE - get base neutrals
  const getBaseNeutrals = (color) => {
    const fixedHue = color.h;
    const tempLight = { mode: 'hsl', h: fixedHue, s: 0.1, l: 0.98 };
    const tempDark = { mode: 'hsl', h: fixedHue, s: 0.1, l: 0.08 };

    const oklchLight = oklch(tempLight);
    const oklchDark = oklch(tempDark);

    //REVIEW - convert to oklch

    setBaseNeutrals({
      baseLight: `oklch(${round(oklchLight?.l)} ${round(oklchLight?.c)} ${round(oklchLight?.h)}`,
      baseDark: `oklch(${round(oklchDark?.l)} ${round(oklchDark?.c)} ${round(oklchDark?.h)}`,
    });
  };

  //NOTE - wrap hue between 0-360
  const wrapHue = (color) => {
    const h = ((color.h % 360) + 360) % 360;
    return { ...color, h };
  };

  //NOTE - get palette
  const getBasePalette = (color, steps, role) => {
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
    let tints = samples(steps)
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

    //REVIEW - inserire conversione tints e shades in formato oklch
    tints = convertToOklch(tints);
    shades = convertToOklch(shades);

    if (role === 'base') {
      setBasepalette([...tints, ...shades]);
    } else {
      setSemanticPalette((prev) => {
        return {
          ...prev,
          [role]: [...tints, ...shades],
        };
      });
    }
  };

  //NOTE - get semantic hues
  const getSemanticHues = (baseColor) => {
    const huesPreset = {
      error: [334, 341, 355, 5],
      warning: [15, 25, 35, 45],
      success: [80, 100, 124, 139],
      info: [200, 215, 230, 245],
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

    const oklchPalette = convertToOklch(neutrals);

    setNeutralPalette(oklchPalette);
  };

  //NOTE - find bg color with correct APCA contrast
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

  //NOTE - get roles
  const getRoles = ({
    palette,
    textColor,
    minContrast,
    minContrastVariant,
    minContrastWithBg,
    bgColor,
    role,
    sem,
    setRoleGroup,
  }) => {
    if (role === 'solid') {
      const solidColor = findBgColor(
        palette,
        textColor,
        minContrast,
        minContrastWithBg,
        bgColor
      );
      if (!sem) {
        setRoleGroup((prev) => {
          return {
            ...prev,
            [role]: solidColor,
            [`on ${role}`]: textColor,
          };
        });
      } else {
        setRoleGroup((prev) => {
          return {
            ...prev,
            [sem]: {
              ...prev[sem],
              [role]: solidColor,
              [`on ${role}`]: textColor,
            },
          };
        });
      }
    } else if (role === 'soft') {
      const softTextColor = findTextColor(palette, minContrast, bgColor);
      console.log('soft text color: ', softTextColor);
      if (!sem) {
        setRoleGroup((prev) => {
          return {
            ...prev,
            [role]: bgColor,
            [`on ${role}`]: softTextColor,
          };
        });
      } else {
        setRoleGroup((prev) => {
          return {
            ...prev,
            [sem]: {
              ...prev[sem],
              [role]: bgColor,
              [`on ${role}`]: softTextColor,
            },
          };
        });
      }
    } else if (role === 'background') {
      // const neutralTextColor = findTextColor(palette, minContrast, bgColor);
      // const neutralTextColor = 'hsl(0, 0%, 0%)';
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
          [`on ${role}`]: 'oklch(0 0 0)',
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
      getBasePalette(hslObjColor, 12, 'base');
      getneutralPalette(baseNeutrals?.baseLight, baseNeutrals?.baseDark, 23);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseNeutrals]);

  useEffect(() => {
    if (
      !semanticColors?.error ||
      !semanticColors?.warning ||
      !semanticColors?.success ||
      !semanticColors?.info
    )
      return;

    getBasePalette(hsl(semanticColors?.error), 12, 'error');
    getBasePalette(hsl(semanticColors?.warning), 12, 'warning');
    getBasePalette(hsl(semanticColors?.success), 12, 'success');
    getBasePalette(hsl(semanticColors?.info), 12, 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [semanticColors]);

  useEffect(() => {
    if (basePalette?.length == 0 || !baseNeutrals?.baseLight) return;

    const roleConfigs = [
      // base color -> solid
      {
        palette: basePalette,
        textColor: baseNeutrals?.baseLight,
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        setRoleGroup: setPrimaryRoles,
      },
      // base color -> soft
      {
        palette: basePalette,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: basePalette[3],
        role: 'soft',
        setRoleGroup: setPrimaryRoles,
      },
      // neutral color -> background
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
      // neutral color -> border
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
      // semantic color -> error -> solid
      {
        palette: semanticPalette?.error,
        textColor: semanticPalette?.error[0],
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        sem: 'error',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> error -> soft
      {
        palette: semanticPalette?.error,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: semanticPalette?.error[3],
        role: 'soft',
        sem: 'error',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> warning -> solid
      {
        palette: semanticPalette?.warning,
        textColor: semanticPalette?.warning[0],
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        sem: 'warning',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> warning -> soft
      {
        palette: semanticPalette?.warning,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: semanticPalette?.warning[3],
        role: 'soft',
        sem: 'warning',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> success -> solid
      {
        palette: semanticPalette?.success,
        textColor: semanticPalette?.success[0],
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        sem: 'success',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> success -> soft
      {
        palette: semanticPalette?.success,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: semanticPalette?.success[3],
        role: 'soft',
        sem: 'success',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> info -> solid
      {
        palette: semanticPalette?.info,
        textColor: semanticPalette?.info[0],
        minContrast: 75,
        minContrastWithBg: 60,
        bgColor: baseNeutrals?.baseLight,
        role: 'solid',
        sem: 'info',
        setRoleGroup: setSemanticRoles,
      },
      // semantic color -> info -> soft
      {
        palette: semanticPalette?.info,
        textColor: null,
        minContrast: 60,
        minContrastWithBg: null,
        bgColor: semanticPalette?.info[3],
        role: 'soft',
        sem: 'info',
        setRoleGroup: setSemanticRoles,
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
    semanticRoles,
    semanticPalette,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
