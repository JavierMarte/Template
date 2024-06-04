import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [accountsPagination, setAccountsPagination] = useState({
    rowsPerPage:  10, // Default value for accounts view
  });

  const [scenariosPagination, setScenariosPagination] = useState({
    rowsPerPage:  10, // Default value for scenarios view
  });

  const [testCasesPagination, setTestCasesPagination] = useState({
    rowsPerPage:  10, // Default value for test cases view
  });

  const [logsPagination, setLogsPagination] = useState({
    rowsPerPage:  10, // Default value for logs view
  });

  const [sortingOptions, setSortingOptions] = useState({
    field: 'name', // Default sort field
    direction: 'asc', // Default sort direction
  });

  const value = {
    accountsPagination,
    setAccountsPagination,
    scenariosPagination,
    setScenariosPagination,
    testCasesPagination,
    setTestCasesPagination,
    logsPagination,
    setLogsPagination,
    sortingOptions,
    setSortingOptions
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};