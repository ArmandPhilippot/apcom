import { useCallback, useEffect, useRef, type MutableRefObject } from 'react';

export type useOnClickOutsideHandler = (ev: MouseEvent | FocusEvent) => void;

/**
 * Detect clicks (or focus) outside a component.
 *
 * @param {useOnClickOutsideHandler} [handler] - A function to handle the event.
 * @returns {RefObject<T>} A ref object.
 */
export const useOnClickOutside = <T extends HTMLElement>(
  handler?: useOnClickOutsideHandler
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);

  const listener = useCallback(
    (ev: MouseEvent | FocusEvent) => {
      if (!handler || !ref.current || ref.current.contains(ev.target as Node)) {
        return;
      }

      handler(ev);
    },
    [handler]
  );

  useEffect(() => {
    document.addEventListener('click', listener, true);
    document.addEventListener('focusin', listener, true);

    return () => {
      document.removeEventListener('click', listener, true);
      document.removeEventListener('focusin', listener, true);
    };
  }, [listener]);

  return ref;
};
