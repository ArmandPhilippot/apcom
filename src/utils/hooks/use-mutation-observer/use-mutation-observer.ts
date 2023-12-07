import { type RefObject, useEffect } from 'react';
import type { Nullable } from '../../../types';

type UseMutationObserverProps<T extends Nullable<HTMLElement>> = {
  /**
   * A callback to execute when mutations are observed.
   */
  callback: MutationCallback;
  /**
   * The options passed to mutation observer.
   */
  options: MutationObserverInit;
  /**
   * A reference to the DOM node to observe.
   */
  ref: RefObject<T>;
};

export const useMutationObserver = <T extends Nullable<HTMLElement>>({
  callback,
  options,
  ref,
}: UseMutationObserverProps<T>) => {
  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new MutationObserver(callback);

    observer.observe(ref.current, options);

    return () => {
      observer.disconnect();
    };
  }, [callback, options, ref]);
};
