import ButtonLink from '@components/atoms/buttons/button-link';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import { FC } from 'react';
import ResponsiveImage, {
  type ResponsiveImageProps,
} from '../images/responsive-image';
import styles from './card.module.scss';
import Meta, { type MetaData } from './meta';

export type Cover = {
  /**
   * The cover alternative text.
   */
  alt: string;
  /**
   * The cover height.
   */
  height: number;
  /**
   * The cover source.
   */
  src: string;
  /**
   * The cover width.
   */
  width: number;
};

export type CardProps = {
  /**
   * Set additional classnames to the card wrapper.
   */
  className?: string;
  /**
   * The card cover.
   */
  cover?: Cover;
  /**
   * The cover fit. Default: cover.
   */
  coverFit?: ResponsiveImageProps['objectFit'];
  /**
   * The card meta.
   */
  meta?: MetaData;
  /**
   * The card tagline.
   */
  tagline?: string;
  /**
   * The card title.
   */
  title: string;
  /**
   * The title level (hn).
   */
  titleLevel: HeadingLevel;
  /**
   * The card target.
   */
  url: string;
};

/**
 * Card component
 *
 * Render a link with minimal information about its content.
 */
const Card: FC<CardProps> = ({
  className = '',
  cover,
  coverFit = 'cover',
  meta,
  tagline,
  title,
  titleLevel,
  url,
}) => {
  return (
    <ButtonLink target={url} className={`${styles.wrapper} ${className}`}>
      <article className={styles.article}>
        <header className={styles.header}>
          {cover && (
            <ResponsiveImage
              {...cover}
              objectFit={coverFit}
              className={styles.cover}
            />
          )}
          <Heading
            alignment="center"
            level={titleLevel}
            className={styles.title}
          >
            {title}
          </Heading>
        </header>
        <div className={styles.tagline}>{tagline}</div>
        {meta && (
          <footer className={styles.footer}>
            <Meta
              data={meta}
              layout="inline"
              className={styles.list}
              groupClassName={styles.meta__item}
              labelClassName={styles.meta__label}
              valueClassName={styles.meta__value}
            />
          </footer>
        )}
      </article>
    </ButtonLink>
  );
};

export default Card;
