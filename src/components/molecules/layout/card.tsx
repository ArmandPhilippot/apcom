import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import { ButtonLink, Figure, Heading, type HeadingLevel } from '../../atoms';
import { MetaList, type MetaItemData } from '../meta-list';
import styles from './card.module.scss';

export type CardProps = {
  /**
   * Set additional classnames to the card wrapper.
   */
  className?: string;
  /**
   * The card cover.
   */
  cover?: Pick<NextImageProps, 'alt' | 'src' | 'title' | 'width' | 'height'>;
  /**
   * The card id.
   */
  id: string;
  /**
   * The card meta.
   */
  meta?: MetaItemData[];
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
            <Figure>
              <NextImage {...cover} className={styles.cover} />
            </Figure>
          ) : null}
          <Heading className={styles.title} id={headingId} level={titleLevel}>
            {title}
          </Heading>
        </header>
        {tagline ? <div className={styles.tagline}>{tagline}</div> : null}
        {meta ? (
          <footer className={styles.footer}>
            <MetaList
              className={styles.list}
              hasBorderedValues={meta.length < 2}
              hasInlinedValues={meta.length < 2}
              isCentered
              items={meta}
            />
          </footer>
        ) : null}
      </article>
    </ButtonLink>
  );
};
