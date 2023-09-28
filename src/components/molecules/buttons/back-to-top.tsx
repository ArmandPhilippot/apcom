import type { FC, HTMLAttributes } from 'react';
import { useIntl } from 'react-intl';
import { ButtonLink, Icon } from '../../atoms';
import styles from './back-to-top.module.scss';

export type BackToTopProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Define the element id to us as anchor.
   */
  to: string;
};

/**
 * BackToTop component
 *
 * Render a back to top link.
 */
export const BackToTop: FC<BackToTopProps> = ({
  className = '',
  to,
  ...props
}) => {
  const intl = useIntl();
  const linkName = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'BackToTop: link text',
    id: 'm+SUSR',
  });
  const btnClass = `${styles.wrapper} ${className}`;
  const anchor = `#${to}`;

  return (
    <div {...props} className={btnClass}>
      <ButtonLink
        aria-label={linkName}
        className={styles.link}
        // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
        shape="square"
        to={anchor}
      >
        {/* eslint-disable-next-line react/jsx-no-literals -- Config allowed */}
        <Icon aria-hidden={true} orientation="top" shape="arrow" />
      </ButtonLink>
    </div>
  );
};
