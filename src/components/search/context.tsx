// ThemeContext.js
import { createContext, useContext, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
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

  const search = useCallback(async (query) => {
    console.log('---search call', query);
    const response = await getHeadLines({ query });
    console.log('=======\n======\n======\n', response);
  }, []);

  const suggestion = useCallback((query) => {
    console.log('---suggestion call', query);
  }, []);

  const searchDebounced = useDebounce(search, 500);
  const suggestionDebounced = useDebounce(suggestion, 500);
  // return <div>wsedrftghb</div>;

  // Provide both the current state and the toggle function
  return (
    <SearchContext.Provider
      value={{
        search: searchDebounced,
        suggestion: suggestionDebounced,
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
