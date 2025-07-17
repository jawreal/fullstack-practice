import { useState, useEffect } from 'react';

const useDebounce = <T>(query: T, delay: number = 500) => {
  const [debounceValue, setDebounceValue] = useState<T>('');
  
  useEffect(() => {
    setTimeout(() => {
      setDebounceValue(query)
    }, 800)
  }, [query, delay])
  
  return debounceValue;
};

export default useDebounce;