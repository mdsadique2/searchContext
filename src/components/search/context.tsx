// ThemeContext.js
import { createContext, useContext, useCallback } from 'react';
import { getHeadLines } from './service';

// 1. Initialize the Context
const SearchContext = createContext(undefined);

// 2. Create the Provider Component
export function SearchProvider({ children, config }) {
  const defaultValues = {
    searchUrl: '',
    suggestionUrl: '',
    delay: 50,
    ...config,
  };

  const search = useCallback(async ({query, controller, page}) => {
    return await getHeadLines({ query, controller, page });
  }, []);

  const suggestion = useCallback((query) => {
    console.log('---suggestion call', query);
  }, []);


  // Provide both the current state and the toggle function
  return (
    <SearchContext.Provider
      value={{
        search: search,
        suggestion: suggestion,
        defaultValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

// 3. Create a Custom Hook for clean consumption
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used inside a SearchProvider');
  }
  return context;
}
