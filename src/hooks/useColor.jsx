import { useState, useRef } from 'react';
import { hsl, formatHsl } from 'culori';

const useColor = () => {
  // --- VARIABLES ----------------------------------------------------------

  //NOTE - input color by user
  const inputColor = useRef(null);

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

  // --- HANDLE --------------------

  const handleClick = () => {
    const convertedColor = getHslColor(
      getHslObjColor(inputColor.current.value)
    );
    setBaseColor(convertedColor);
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
