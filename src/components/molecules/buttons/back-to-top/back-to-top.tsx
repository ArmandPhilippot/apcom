import type { FC } from 'react';
import {
  ButtonLink,
  type ButtonLinkProps,
  Icon,
  VisuallyHidden,
} from '../../../atoms';
import styles from './back-to-top.module.scss';

export type BackToTopProps = Omit<
  ButtonLinkProps,
  'children' | 'isExternal' | 'kind' | 'to'
> & {
  /**
   * Define the anchor.
   */
  anchor: string;
  /**
   * Define an accessible label for the button.
   */
  label: string;
};

/**
 * BackToTop component
 *
 * Render a back to top link.
 */
export const BackToTop: FC<BackToTopProps> = ({
  anchor,
  className = '',
  label,
  shape = 'square',
  ...props
}) => {
  const btnClass = `${styles.link} ${className}`;

  return (
    <ButtonLink {...props} className={btnClass} shape={shape} to={anchor}>
      {/* eslint-disable-next-line react/jsx-no-literals -- Config allowed */}
      <Icon aria-hidden orientation="top" shape="arrow" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </ButtonLink>
  );
};
