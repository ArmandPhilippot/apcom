import Heading from '@components/atoms/headings/heading';
import Link from 'next/link';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import FlippingLogo, { type FlippingLogoProps } from '../images/flipping-logo';
import styles from './branding.module.scss';

export type BrandingProps = Pick<FlippingLogoProps, 'photo'> & {
  /**
   * The Branding baseline.
   */
  baseline?: string;
  /**
   * Use H1 if the current page is homepage. Default: false.
   */
  isHome?: boolean;
  /**
   * The Branding title;
   */
  title: string;
  /**
   * Wraps the title with a link to homepage. Default: false.
   */
  withLink?: boolean;
};

/**
 * Branding component
 *
 * Render the branding logo, title and optional baseline.
 */
const Branding: FC<BrandingProps> = ({
  baseline,
  isHome = false,
  photo,
  title,
  withLink = false,
  ...props
}) => {
  const intl = useIntl();
  const altText = intl.formatMessage(
    {
      defaultMessage: '{website} picture',
      description: 'Branding: photo alternative text',
      id: 'dDK5oc',
    },
    { website: title }
  );
  const logoTitle = intl.formatMessage(
    {
      defaultMessage: '{website} logo',
      description: 'Branding: logo title',
      id: 'x55qsD',
    },
    { website: title }
  );

  return (
    <div className={styles.wrapper}>
      <FlippingLogo
        className={styles.logo}
        altText={altText}
        logoTitle={logoTitle}
        photo={photo}
        {...props}
      />
      <Heading
        isFake={!isHome}
        level={1}
        withMargin={false}
        className={styles.title}
      >
        {withLink ? (
          <Link href="/">
            <a className={styles.link}>{title}</a>
          </Link>
        ) : (
          title
        )}
      </Heading>
      {baseline && (
        <Heading
          isFake={true}
          level={4}
          withMargin={false}
          className={styles.baseline}
        >
          {baseline}
        </Heading>
      )}
    </div>
  );
};

export default Branding;
