import { RefObject, useEffect } from 'react';

export type UseInputAutofocusProps = {
  /**
   * The focus condition. True give focus to the input.
   */
  condition: boolean;
  /**
   * An optional delay. Default: 0.
   */
  delay?: number;
  /**
   * A reference to the input element.
   */
  ref: RefObject<HTMLInputElement>;
};

/**
 * Set focus on an input with an optional delay.
 */
export const useInputAutofocus = ({
  condition,
  delay = 0,
  ref,
}: UseInputAutofocusProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current && condition) {
        ref.current.focus();
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [condition, delay, ref]);
};
