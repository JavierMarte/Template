// src/context/GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({});

  return (
    <GlobalContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </GlobalContext.Provider>
  );
};
