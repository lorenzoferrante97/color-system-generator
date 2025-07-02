import { useState, useRef, useEffect } from 'react';
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
  const getBaseNeutrals = (color) => {};

  // --- HANDLE --------------------

  const handleClick = () => {
    // const convertedColor = getHslColor(
    //   getHslObjColor(inputColor.current.value)
    // );
    const obj = getHslObjColor(inputColor?.current.value);
    setHslObjColor(obj);
    const hsl = getHslColor(obj);
    setBaseColor(hsl);
  };

  return {
    inputColor,
    baseColor,
    getHslObjColor,
    getHslColor,
    handleClick,
  };
};

export default useColor;
