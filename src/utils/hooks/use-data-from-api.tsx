import { useEffect, useState } from 'react';

/**
 * Fetch data from an API.
 *
 * This hook is a wrapper to `setState` + `useEffect`.
 *
 * @param fetcher - A function to fetch data from API.
 * @returns {T | undefined} The requested data.
 */
const useDataFromAPI = <T extends unknown>(
  fetcher: () => Promise<T>
): T | undefined => {
  const [data, setData] = useState<T>();

  useEffect(() => {
    fetcher().then((apiData) => setData(apiData));
  }, [fetcher]);

  return data;
};

export default useDataFromAPI;
