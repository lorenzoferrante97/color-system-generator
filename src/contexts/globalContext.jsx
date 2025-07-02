import { createContext, useContext } from 'react';
const GlobalContext = createContext();
import useColor from '../hooks/useColor';

const GlobalProvider = ({ children }) => {
  // USECOLOR -----------------------------------------------
  const {
    inputColor,
    baseColor,
    getHslObjColor,
    getHslColor,
    handleClick,
    baseNeutrals,
  } = useColor();

  const value = {
    inputColor,
    baseColor,
    getHslObjColor,
    getHslColor,
    handleClick,
    baseNeutrals,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalProvider, useGlobalContext };
