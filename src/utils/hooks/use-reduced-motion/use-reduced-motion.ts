import { useContext } from 'react';
import { MotionContext } from '../../providers/motion-provider';

export const useReducedMotion = () => {
  const { isReduced, setIsReduced, toggleReducedMotion } =
    useContext(MotionContext);

  return { isReduced, setIsReduced, toggleReducedMotion };
};
