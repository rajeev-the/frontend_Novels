import React, { createContext, useContext, useState } from 'react';

// Create Context
const DarkModeContext = createContext();

// Custom Hook
export const useDarkMode = () => useContext(DarkModeContext);

// Provider Component
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div data-bs-theme={darkMode ? 'dark' : 'light'}>{children}</div>
    </DarkModeContext.Provider>
  );
};
