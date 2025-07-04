import { useState, useRef, useEffect, useCallback } from 'react';
import {
  hsl,
  formatHsl,
  samples,
  interpolate,
  toGamut,
  clampGamut,
} from 'culori';

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

  //NOTE - get tints
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

    // gamut hsl
    // const toHsl = toGamut('hsl');

    // create shades
    const interpolatedShades = interpolate([baseStep, lastShadeStep], 'hsl');
    let shades = samples(steps)
      .map(interpolatedShades)
      .map(clamp)
      .map((c) => wrapHue(c))
      .map(formatHsl);
    shades.shift();

    setBasepalette([...tints, ...shades]);
  };

  // --- HANDLE --------------------

  const handleClick = useCallback(() => {
    const obj = getHslObjColor(inputColor?.current.value);
    setHslObjColor(obj);
    const hsl = getHslColor(obj);
    setBaseColor(hsl);
  }, []);

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

  return {
    inputColor,
    baseColor,
    baseNeutrals,
    basePalette,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
