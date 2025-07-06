import { createContext, useContext } from 'react';
const GlobalContext = createContext();
import useColor from '../hooks/useColor';

const GlobalProvider = ({ children }) => {
  // USECOLOR -----------------------------------------------
  const {
    inputColor,
    baseColor,
    basePalette,
    baseNeutrals,
    primaryRoles,
    neutralPalette,
    neutralRoles,
    semanticColors,
    semanticRoles,
    semanticPalette,
    getHslObjColor,
    getHslColor,
    handleClick,
  } = useColor();

  const value = {
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

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

// eslint-disable-next-line react-refresh/only-export-components
export { GlobalProvider, useGlobalContext };
