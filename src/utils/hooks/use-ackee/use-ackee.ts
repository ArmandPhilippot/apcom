import { useCallback, useContext } from 'react';
import { AckeeContext } from '../../providers';

export const useAckee = () => {
  const { tracking, setTracking } = useContext(AckeeContext);

  const toggle = useCallback(() => {
    setTracking((prev) => {
      if (prev === 'full') return 'partial';
      return 'full';
    });
  }, [setTracking]);

  return [tracking, toggle] as const;
};
