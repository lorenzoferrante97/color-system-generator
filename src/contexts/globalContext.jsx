import { createContext, useContext } from 'react';
const GlobalContext = createContext();
import useColor from '../hooks/useColor';

const GlobalProvider = ({ children }) => {
  // USECOLOR -----------------------------------------------
  const { inputColor, getHslObjColor, getHslColor } = useColor();

  const value = { inputColor, getHslObjColor, getHslColor };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
