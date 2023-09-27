import Link from 'next/link';
import { type FC, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useStyles } from '../../../utils/hooks';
import { Heading } from '../../atoms';
import { FlippingLogo, type FlippingLogoProps } from '../images';
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
export const Branding: FC<BrandingProps> = ({
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
        {...props}
        altText={altText}
        className={styles.logo}
        logoTitle={logoTitle}
        photo={photo}
        ref={logoRef}
      />
      <Heading
        className={styles.title}
        isFake={!isHome}
        level={1}
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
      {baseline ? (
        <Heading className={styles.baseline} isFake level={4} ref={baselineRef}>
          {baseline}
        </Heading>
      ) : null}
    </div>
  );
};
