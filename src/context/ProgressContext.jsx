import { createContext, useContext, useState } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ProgressContext.Provider value={{ userProgress, setUserProgress, isLoading, setIsLoading }}>
      {children}
    </ProgressContext.Provider>
  );
};

