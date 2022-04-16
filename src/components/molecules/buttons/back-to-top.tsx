import ButtonLink, {
  type ButtonLinkProps,
} from '@components/atoms/buttons/button-link';
import Arrow from '@components/atoms/icons/arrow';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './back-to-top.module.scss';

export type BackToTopProps = Pick<ButtonLinkProps, 'target'> & {
  /**
   * Set additional classnames to the button wrapper.
   */
  className?: string;
};

/**
 * BackToTop component
 *
 * Render a back to top link.
 */
const BackToTop: FC<BackToTopProps> = ({ className = '', target }) => {
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
