import * as React from 'react';

export const ResultSizeContext = React.createContext();

export const ResultsSizeContextProvider = ({ children }) => {
  const [resultsSize, setResultsSize] = React.useState(100);
  return (
    <ResultSizeContext.Provider value={{ resultsSize, setResultsSize }}>
      {children}
    </ResultSizeContext.Provider>
  );
}
