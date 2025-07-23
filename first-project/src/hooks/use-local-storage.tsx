import { useState } from 'react';

export default function useLocalStorage(key: string, defaultValue: string) {
  const createInitialStoredValue = () => {
    const item = window.localStorage.getItem(key);
    return item ? item : defaultValue;
  };

  const [storedValue, setStoredValue] = useState<string>(createInitialStoredValue);

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };

  return [storedValue, setValue] as const;
}
