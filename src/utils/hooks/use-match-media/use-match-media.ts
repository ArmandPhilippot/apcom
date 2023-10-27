import { useEffect } from 'react';

export type UseMatchMediaCallback = (ev: MediaQueryListEvent) => void;

/**
 * React hook to watch for media changes based on the given query.
 *
 * @param {string} query - A media query.
 * @param {UseMatchMediaCallback} cb - A callback function to execute on change.
 */
export const useMatchMedia = (query: string, cb: UseMatchMediaCallback) => {
  useEffect(() => {
    window.matchMedia(query).addEventListener('change', cb);

    return () => window.matchMedia(query).removeEventListener('change', cb);
  }, [cb, query]);
};
