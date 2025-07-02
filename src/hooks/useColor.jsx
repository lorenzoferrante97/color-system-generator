import { useState, useRef, useEffect, useCallback } from 'react';
import { hsl, formatHsl } from 'culori';

const useColor = () => {
  // --- VARIABLES ----------------------------------------------------------

  //NOTE - input color by user
  const inputColor = useRef(null);

  //NOTE - hsl Obj Color
  const [hslObjColor, setHslObjColor] = useState({
    mode: 'hsl',
    h: 0,
    s: 0,
    l: 0,
  });

  //NOTE - base color
  const [baseColor, setBaseColor] = useState(null);

  //NOTE - base neutrals
  const [baseNeutrals, setBaseNeutrals] = useState({
    baseLight: null,
    baseDark: null,
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

  return {
    inputColor,
    baseColor,
    baseNeutrals,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
