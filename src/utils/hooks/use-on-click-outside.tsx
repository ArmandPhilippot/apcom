import { RefObject, useCallback, useEffect, useRef } from 'react';

export type UseOnClickOutsideCallback = (target: Node) => void;

/**
 * Detect click/focus outside an element and fire a callback function.
 *
 * @param {UseOnClickOutsideCallback} callback - A callback function to fire.
 * @param {boolean} useCapture - Define event propagation method. Default: true.
 * @returns {RefObject} A React reference object.
 */
const useOnClickOutside = <T extends HTMLElement>(
  callback: UseOnClickOutsideCallback,
  useCapture: boolean = true
): RefObject<T> => {
  const ref = useRef<T | null>(null);

  /**
   * Check if the target is outside the ref.
   *
   * @param {Node} target - The event target.
   * @returns {boolean | null} True if the target is outside the ref.
   */
  const isTargetOutside = (target: Node): boolean | null => {
    return ref.current && !ref.current.contains(target);
  };

  /**
   * Fire the callback if the event target is outside.
   */
  const handler = useCallback(
    (e: MouseEvent | FocusEvent) => {
      if (e.target && isTargetOutside(e.target as Node))
        callback(e.target as Node);
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('click', handler, useCapture);
    document.addEventListener('focusin', handler, useCapture);

    return () => {
      document.removeEventListener('click', handler);
      document.removeEventListener('focusin', handler);
    };
  }, [handler, useCapture]);

  return ref;
};

export default useOnClickOutside;
