import type { FC } from 'react';
import type { Image as Img } from '../../../types';
import { ButtonLink, Heading, type HeadingLevel } from '../../atoms';
import { ResponsiveImage } from '../images';
import styles from './card.module.scss';
import { Meta, type MetaData } from './meta';

export type CardProps = {
  /**
   * Set additional classnames to the card wrapper.
   */
  className?: string;
  /**
   * The card cover.
   */
  cover?: Img;
  /**
   * The card id.
   */
  id: string;
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
export const Card: FC<CardProps> = ({
  className = '',
  cover,
  id,
  meta,
  tagline,
  title,
  titleLevel,
  url,
}) => {
  const cardClass = `${styles.wrapper} ${className}`;
  const headingId = `${id}-heading`;

  return (
    <ButtonLink aria-labelledby={headingId} className={cardClass} to={url}>
      <article className={styles.article}>
        <header className={styles.header}>
          {cover ? (
            <ResponsiveImage {...cover} className={styles.cover} />
          ) : null}
          <Heading className={styles.title} id={headingId} level={titleLevel}>
            {title}
          </Heading>
        </header>
        {tagline ? <div className={styles.tagline}>{tagline}</div> : null}
        {meta ? (
          <footer className={styles.footer}>
            <Meta className={styles.list} data={meta} spacing="sm" />
          </footer>
        ) : null}
      </article>
    </ButtonLink>
  );
};
