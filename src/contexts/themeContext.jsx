/* eslint-disable react-refresh/only-export-components */
// Context per le logiche del tema dell'app

import React, { createContext, useContext, useEffect, useState } from 'react';

// CONTEXT -------------------------------------------------------------------------------

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') setTheme(stored);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // VALUES -------------------------------------------------------------------------------
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// USE CONTEXT -------------------------------------------------------------------------------

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useThemeContext deve essere usato all’interno di <ThemeProvider>'
    );
  }
  return context;
};

export { ThemeProvider, useThemeContext };
