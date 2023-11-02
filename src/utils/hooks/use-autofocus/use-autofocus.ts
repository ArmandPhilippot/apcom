import { useCallback, useRef, type MutableRefObject } from 'react';
import { useTimeout } from '../use-timeout';

export type UseAutofocusCondition = () => boolean;

export type UseAutofocusConfig = {
  /**
   * A condition to met before giving focus to the element.
   */
  condition?: UseAutofocusCondition;
  /**
   * A delay in ms before giving focus to the element.
   */
  delay?: number;
};

/**
 * React hook to give focus to an element automatically.
 *
 * @param {UseAutofocusConfig} [config] - A configuration object.
 * @returns {RefObject<T>} The element reference.
 */
export const useAutofocus = <T extends HTMLElement>(
  config?: UseAutofocusConfig
): MutableRefObject<T | null> => {
  const { condition, delay } = config ?? {};
  const ref = useRef<T | null>(null);

  const setFocus = useCallback(() => {
    const shouldFocus = condition ? condition() : true;

    if (ref.current && shouldFocus) {
      ref.current.focus();
    }
  }, [condition]);

  useTimeout(setFocus, delay);

  return ref;
};
