import { useState } from 'react';

export default function useLocalStorage(key: string, defaultValue: string) {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = window.localStorage.getItem(key);
    return item ? item : defaultValue;
  });

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue] as const;
}
