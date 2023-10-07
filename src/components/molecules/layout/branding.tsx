import { type FC, useRef, type ReactNode } from 'react';
import { useStyles } from '../../../utils/hooks';
import { Flip, FlipSide, Heading, Link } from '../../atoms';
import styles from './branding.module.scss';

export type BrandingProps = {
  /**
   * The Branding baseline.
   */
  baseline?: string;
  /**
   * Use H1 if the current page is homepage. Default: false.
   */
  isHome?: boolean;
  /**
   * The website logo.
   */
  logo: ReactNode;
  /**
   * Your photo.
   */
  photo: ReactNode;
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
  logo,
  photo,
  title,
  withLink = false,
  ...props
}) => {
  const baselineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

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

  return (
    <div className={styles.wrapper}>
      <Flip {...props} className={styles.logo}>
        <FlipSide className={styles.flip}>{photo}</FlipSide>
        <FlipSide className={styles.flip} isBack>
          {logo}
        </FlipSide>
      </Flip>
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
