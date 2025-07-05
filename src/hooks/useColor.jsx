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

  //NOTE - tints & shades
  const [basePalette, setBasepalette] = useState([]);

  //NOTE - primary roles
  const [primaryRoles, setPrimaryRoles] = useState({
    solid: null,
    ['on solid']: null,
    soft: null,
    ['on soft']: null,
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
    const tempLight = { mode: 'hsl', h: fixedHue, s: 0.2, l: 0.98 };
    const tempDark = { mode: 'hsl', h: fixedHue, s: 0.2, l: 0.08 };

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
    console.log('validtextColor: ', validTextColor);

    return validTextColor || null;
  };

  // get roles
  const getRoles = ({
    palette,
    textColor,
    minContrast,
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
    } else {
      const primarySoftText = findTextColor(palette, minContrast, bgColor);
      console.log('primarySoftText: ', primarySoftText);
      setRoleGroup((prev) => {
        return {
          ...prev,
          [role]: bgColor,
          [`on ${role}`]: primarySoftText,
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
    }
  }, [hslObjColor]);

  useEffect(() => {
    if (baseNeutrals.baseLight !== null) {
      getBasePalette(hslObjColor, 12);
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
    ];

    roleConfigs.forEach(getRoles);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePalette, baseNeutrals?.baseLight]);

  return {
    inputColor,
    baseColor,
    baseNeutrals,
    basePalette,
    primaryRoles,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
