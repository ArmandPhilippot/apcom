import { useAckeeTracker } from '@utils/providers/ackee';
import { useEffect } from 'react';

export type AckeeOptions = 'full' | 'partial';

/**
 * Update Ackee settings with the given choice.
 *
 * @param {AckeeOptions} value - Either `full` or `partial`.
 */
const useUpdateAckeeOptions = (value: AckeeOptions) => {
  const { setDetailed } = useAckeeTracker();

  useEffect(() => {
    setDetailed(value === 'full');
  }, [value, setDetailed]);
};

export default useUpdateAckeeOptions;
