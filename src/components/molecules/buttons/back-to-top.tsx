import ButtonLink from '@components/atoms/buttons/button-link';
import Arrow from '@components/atoms/icons/arrow';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import styles from './back-to-top.module.scss';

type BackToTopProps = {
  /**
   * Add additional classes to the button wrapper.
   */
  additionalClasses?: string;
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
const BackToTop: FC<BackToTopProps> = ({ additionalClasses, target }) => {
  const intl = useIntl();
  const linkName = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'BackToTop: link text',
    id: 'm+SUSR',
  });

  return (
    <div className={`${styles.wrapper} ${additionalClasses}`}>
      <ButtonLink shape="square" target={`#${target}`} aria-label={linkName}>
        <Arrow direction="top" />
      </ButtonLink>
    </div>
  );
};

export default BackToTop;
