import { useEffect } from 'react';
import { useAckeeTracker } from '../providers';

export type AckeeOptions = 'full' | 'partial';

/**
 * Update Ackee settings with the given choice.
 *
 * @param {AckeeOptions} value - Either `full` or `partial`.
 */
export const useUpdateAckeeOptions = (value: AckeeOptions) => {
  const { setDetailed } = useAckeeTracker();

  useEffect(() => {
    setDetailed(value === 'full');
  }, [value, setDetailed]);
};
