import type { LegacyRef, MutableRefObject, RefCallback } from 'react';
import type { Nullable } from '../../types';

export const mergeRefs =
  <T = unknown>(
    refs: (MutableRefObject<T> | LegacyRef<T> | undefined | null)[]
  ): RefCallback<T> =>
  (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null) {
        (ref as MutableRefObject<Nullable<T>>).current = value;
      }
    });
  };
