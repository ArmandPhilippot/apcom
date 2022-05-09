import ButtonLink from '@components/atoms/buttons/button-link';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import Arrow from '@components/atoms/icons/arrow';
import Link from '@components/atoms/links/link';
import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Meta, { MetaData } from '@components/molecules/layout/meta';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styles from './summary.module.scss';

export type Cover = Pick<
  ResponsiveImageProps,
  'alt' | 'src' | 'width' | 'height'
>;

export type SummaryMeta = Pick<
  MetaData,
  | 'author'
  | 'commentsCount'
  | 'publication'
  | 'readingTime'
  | 'thematics'
  | 'update'
>;

export type SummaryProps = {
  /**
   * The post cover.
   */
  cover?: Cover;
  /**
   * The post excerpt.
   */
  excerpt: string;
  /**
   * The post meta.
   */
  meta: SummaryMeta;
  /**
   * The post title.
   */
  title: string;
  /**
   * The heading level (hn).
   */
  titleLevel?: HeadingLevel;
  /**
   * The post url.
   */
  url: string;
};

/**
 * Summary component
 *
 * Render a page summary.
 */
const Summary: FC<SummaryProps> = ({
  cover,
  excerpt,
  meta,
  title,
  titleLevel = 2,
  url,
}) => {
  const intl = useIntl();
  const readMore = intl.formatMessage(
    {
      defaultMessage: 'Read more<a11y> about {title}</a11y>',
      description: 'Summary: read more link',
      id: 'Zpgv+f',
    },
    {
      title,
      a11y: (chunks: ReactNode) => (
        <span className="screen-reader-text">{chunks}</span>
      ),
    }
  );

  return (
    <article className={styles.wrapper}>
      {cover && <ResponsiveImage className={styles.cover} {...cover} />}
      <header className={styles.header}>
        <Link href={url}>
          <Heading level={titleLevel} className={styles.title}>
            {title}
          </Heading>
        </Link>
      </header>
      <div className={styles.body}>
        {typeof excerpt === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
        ) : (
          excerpt
        )}
        <ButtonLink target={url} className={styles['read-more']}>
          <>
            {readMore}
            <Arrow direction="right" />
          </>
        </ButtonLink>
      </div>
      <footer className={styles.footer}>
        <Meta data={meta} layout="column" className={styles.meta} />
      </footer>
    </article>
  );
};

export default Summary;
