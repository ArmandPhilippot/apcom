import { type MutableRefObject, useEffect, useRef } from 'react';

export type UseTimeoutCallback = () => void;

export type UseTimeoutId = string | number | NodeJS.Timeout | undefined;

/**
 * React hook to schedule the execution of a one-time callback after delay.
 *
 * @param {UseTimeoutCallback} callback - The callback to schedule.
 * @param {number} [delay] - A delay in ms.
 * @returns {MutableRefObject<UseTimeoutId>} The timeout id.
 */
export const useTimeout = (
  callback: UseTimeoutCallback,
  delay = 0
): MutableRefObject<UseTimeoutId> => {
  const idRef = useRef<UseTimeoutId>(undefined);

  useEffect(() => {
    idRef.current = setTimeout(() => callback(), delay);

    return () => {
      clearTimeout(idRef.current);
    };
  }, [callback, delay]);

  return idRef;
};
