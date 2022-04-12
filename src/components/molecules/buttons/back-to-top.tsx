import ButtonLink from '@components/atoms/buttons/button-link';
import Arrow from '@components/atoms/icons/arrow';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './back-to-top.module.scss';

export type BackToTopProps = {
  /**
   * Set additional classnames to the button wrapper.
   */
  className?: string;
  /**
   * An element id (without hashtag) to use as anchor.
   */
  target: string;
};

/**
 * BackToTop component
 *
 * Render a back to top link.
 */
const BackToTop: VFC<BackToTopProps> = ({ className = '', target }) => {
  const intl = useIntl();
  const linkName = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'BackToTop: link text',
    id: 'm+SUSR',
  });

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <ButtonLink
        shape="square"
        target={`#${target}`}
        aria-label={linkName}
        className={styles.link}
      >
        <Arrow direction="top" />
      </ButtonLink>
    </div>
  );
};

export default BackToTop;
