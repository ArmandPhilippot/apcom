import Link from 'next/link';
import { FC, useRef } from 'react';
import { useIntl } from 'react-intl';
import useStyles from '../../../utils/hooks/use-styles';
import Heading from '../../atoms/headings/heading';
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
  const baselineRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
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

  useStyles({
    property: '--typing-animation',
    styles: 'blink 0.7s ease-in-out 0s 2, typing 4.3s linear 0s 1',
    target: titleRef,
  });
  useStyles({
    property: '--typing-animation',
    styles:
      'hide-text 4.25s linear 0s 1, blink 0.8s ease-in-out 4.25s 2, typing 3.8s linear 4.25s 1',
    target: baselineRef,
  });
  useStyles({
    property: 'animation',
    styles: 'flip-logo 9s ease-in 0s 1',
    target: logoRef,
  });

  return (
    <div className={styles.wrapper}>
      <FlippingLogo
        className={styles.logo}
        altText={altText}
        logoTitle={logoTitle}
        photo={photo}
        ref={logoRef}
        {...props}
      />
      <Heading
        isFake={!isHome}
        level={1}
        withMargin={false}
        className={styles.title}
        ref={titleRef}
      >
        {withLink ? (
          <Link className={styles.link} href="/">
            {title}
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
          ref={baselineRef}
        >
          {baseline}
        </Heading>
      )}
    </div>
  );
};

export default Branding;
