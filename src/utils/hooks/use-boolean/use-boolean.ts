import { useCallback, useState } from 'react';

export type UseBooleanReturn = {
  /**
   * Set state as true.
   */
  activate: () => void;
  /**
   * Set state as false.
   */
  deactivate: () => void;
  /**
   * Current state.
   */
  state: boolean;
  /**
   * Switch state.
   */
  toggle: () => void;
};

/**
 * React hook to deal with boolean states.
 *
 * @param {boolean} [initialState] - The initial state.
 * @returns {UseBooleanReturn} The state and utility functions to update it.
 */
export const useBoolean = (initialState = false): UseBooleanReturn => {
  const [state, setState] = useState(initialState);

  const activate = useCallback(() => {
    setState(true);
  }, []);

  const deactivate = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return { activate, deactivate, state, toggle };
};
