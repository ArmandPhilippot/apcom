import { useEffect, useState } from 'react';

/**
 * Use React useState hook and update it if initial data change.
 *
 * @param initial - The initial value.
 * @returns The state and a setter.
 */
const useStateChange = <T,>(initial: T) => {
  const [state, setState] = useState<T>(initial);

  useEffect(() => {
    setState(initial);
  }, [initial]);

  return [state, setState] as const;
};

export default useStateChange;
