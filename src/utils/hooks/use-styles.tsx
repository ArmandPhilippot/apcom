import { RefObject, useEffect } from 'react';

export type UseStylesProps = {
  /**
   * A property name or a CSS variable.
   */
  property: string;
  /**
   * The styles.
   */
  styles: string;
  /**
   * A targeted element reference.
   */
  target: RefObject<HTMLElement>;
};

/**
 * Add styles to an element using a React reference.
 *
 * @param {UseStylesProps} props - An object with property, styles and target.
 */
export const useStyles = ({ property, styles, target }: UseStylesProps) => {
  useEffect(() => {
    if (target.current) target.current.style.setProperty(property, styles);
  }, [property, styles, target]);
};
