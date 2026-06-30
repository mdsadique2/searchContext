import { useMemo } from 'react';
import { debounce } from '../utils/debounce';

export const useDebounce = (fn, delay) => {
  let debouncedFn = useMemo(() => {
    return debounce(fn, delay);
  }, [fn, delay]);

  return debouncedFn;
};
