import React, { createContext, useContext, useState } from 'react';

const ToolContext = createContext();

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
};

export const ToolProvider = ({ children }) => {
  const [currentProject, setCurrentProject] = useState('');
  const [recentTools, setRecentTools] = useState([]);

  const value = {
    currentProject,
    setCurrentProject,
    recentTools,
    setRecentTools
  };

  return (
    <ToolContext.Provider value={value}>
      {children}
    </ToolContext.Provider>
  );
};
