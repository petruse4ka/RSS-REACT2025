import { useState, useEffect } from 'react';

export default function useLocalStorage(key: string, defaultValue: string) {
  const [storedValue, setStoredValue] = useState<string>(defaultValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(item);
      }
    }
  }, [key]);

  const setValue = (value: string) => {
    setStoredValue(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  };

  return [mounted ? storedValue : defaultValue, setValue] as const;
}
