import { LocalStorage } from '@services/local-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type UseLocalStorageReturn<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};

/**
 * Use the local storage.
 *
 * @param {string} key - The storage local key.
 * @param {T} [fallbackValue] - A fallback value if local storage is empty.
 * @returns {UseLocalStorageReturn<T>} An object with value and setValue.
 */
const useLocalStorage = <T extends unknown>(
  key: string,
  fallbackValue: T
): UseLocalStorageReturn<T> => {
  const getInitialValue = () => {
    if (typeof window === 'undefined') return fallbackValue;
    const storedValue = LocalStorage.get<T>(key);
    return storedValue || fallbackValue;
  };

  const [value, setValue] = useState<T>(getInitialValue);

  useEffect(() => {
    LocalStorage.set(key, value);
  }, [key, value]);

  return { value, setValue };
};

export default useLocalStorage;
