import ButtonLink from '@components/atoms/buttons/button-link';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import DescriptionList, {
  DescriptionListItem,
} from '@components/atoms/lists/description-list';
import { VFC } from 'react';
import ResponsiveImage, {
  ResponsiveImageProps,
} from '../images/responsive-image';
import styles from './card.module.scss';

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
  meta?: DescriptionListItem[];
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
const Card: VFC<CardProps> = ({
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
          <Heading level={titleLevel} className={styles.title}>
            {title}
          </Heading>
        </header>
        <div className={styles.tagline}>{tagline}</div>
        {meta && (
          <footer className={styles.footer}>
            <DescriptionList
              items={meta}
              layout="inline"
              className={styles.list}
              groupClassName={styles.items}
              termClassName={styles.term}
              descriptionClassName={styles.description}
            />
          </footer>
        )}
      </article>
    </ButtonLink>
  );
};

export default Card;
