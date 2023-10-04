import type { AnchorHTMLAttributes, FC } from 'react';
import { VisuallyHidden } from '../../visually-hidden';
import styles from './sharing-link.module.scss';

export type SharingMedium =
  | 'diaspora'
  | 'email'
  | 'facebook'
  | 'journal-du-hacker'
  | 'linkedin'
  | 'twitter';

export type SharingLinkProps = Omit<
  AnchorHTMLAttributes<HTMLElement>,
  'children' | 'href'
> & {
  /**
   * An accessible label (visually hidden).
   */
  label: string;
  /**
   * The sharing medium id.
   */
  medium: SharingMedium;
  /**
   * The sharing url.
   */
  url: string;
};

/**
 * SharingLink component
 *
 * Render a sharing link.
 */
export const SharingLink: FC<SharingLinkProps> = ({
  className = '',
  label,
  medium,
  url,
  ...props
}) => {
  const mediumClass = `link--${medium}`;
  const linkClass = `${styles.link} ${styles[mediumClass]} ${className}`;

  return (
    <a {...props} className={linkClass} href={url}>
      <VisuallyHidden>{label}</VisuallyHidden>
    </a>
  );
};
