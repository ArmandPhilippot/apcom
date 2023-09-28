/* eslint-disable react/jsx-no-literals */
import type { FC } from 'react';

export type ArrowOrientation = 'top' | 'right' | 'bottom' | 'left';

const getArrowBarPathFrom = (orientation: ArrowOrientation) => {
  switch (orientation) {
    case 'bottom':
      return 'm 55.749998,2e-6 v 61.764896 h -11.5 V 2e-6 Z';
    case 'left':
      return 'M 99.999996,44.25 H 38.2351 v 11.5 h 61.764896 z';
    case 'right':
      return 'm 0,44.25 h 61.764896 v 11.5 H 0 Z';
    case 'top':
    default:
      return 'M 55.749998,99.999998 V 38.235102 h -11.5 v 61.764896 z';
  }
};

const getArrowHeadPathFrom = (orientation: ArrowOrientation) => {
  switch (orientation) {
    case 'bottom':
      return 'm 69.999998,61.764898 -20,38.2351 -20,-38.2351 z';
    case 'left':
      return 'M 38.2351,30 0,50 38.2351,70 Z';
    case 'right':
      return 'm 61.764896,30 38.2351,20 -38.2351,20 z';
    case 'top':
    default:
      return 'm 69.999998,38.235102 -20,-38.2351 -20,38.2351 z';
  }
};

export type ArrowProps = {
  /**
   * The arrow orientation.
   */
  orientation: ArrowOrientation;
};

/**
 * ArrowIconPaths
 *
 * Render the svg paths to make an arrow icon.
 */
export const ArrowIconPaths: FC<ArrowProps> = ({ orientation }) => (
  <>
    <path className="arrow-head" d={getArrowHeadPathFrom(orientation)} />
    <path className="arrow-bar" d={getArrowBarPathFrom(orientation)} />
  </>
);
