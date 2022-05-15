import ButtonLink from '@components/atoms/buttons/button-link';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import Arrow from '@components/atoms/icons/arrow';
import Link from '@components/atoms/links/link';
import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Meta, { type MetaData } from '@components/molecules/layout/meta';
import { type Dates } from '@ts/types/app';
import useReadingTime from '@utils/hooks/use-reading-time';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styles from './summary.module.scss';

export type Cover = Pick<
  ResponsiveImageProps,
  'alt' | 'src' | 'width' | 'height'
>;

export type SummaryMetaLink = {
  id: number | string;
  name: string;
  url: string;
};

export type SummaryMetaReadingTime = {
  wordsCount: number;
  onlyMinutes?: boolean;
};

export type SummaryMeta = {
  author?: string;
  commentsCount?: number;
  dates: Dates;
  readingTime: SummaryMetaReadingTime;
  thematics?: SummaryMetaLink[];
  topics?: SummaryMetaLink[];
};

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
  const { wordsCount, onlyMinutes } = meta.readingTime;
  const readingTime = useReadingTime(wordsCount, onlyMinutes);

  const getMeta = (data: SummaryMeta): MetaData => {
    const { author, commentsCount, dates, thematics, topics } = data;

    return {
      author,
      publication: { date: dates.publication },
      update:
        dates.update && dates.publication !== dates.update
          ? { date: dates.update }
          : undefined,
      readingTime,
      thematics: thematics?.map((thematic) => (
        <Link key={thematic.id} href={thematic.url}>
          {thematic.name}
        </Link>
      )),
      topics: topics?.map((topic) => (
        <Link key={topic.id} href={topic.url}>
          {topic.name}
        </Link>
      )),
      comments: {
        about: title,
        count: commentsCount || 0,
        target: `${url}#comments`,
      },
    };
  };

  return (
    <article className={styles.wrapper}>
      {cover && <ResponsiveImage className={styles.cover} {...cover} />}
      <header className={styles.header}>
        <Link href={url} className={styles.link}>
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
            <Arrow direction="right" className={styles.icon} />
          </>
        </ButtonLink>
      </div>
      <footer className={styles.footer}>
        <Meta
          data={getMeta(meta)}
          layout="column"
          itemsLayout="stacked"
          withSeparator={false}
          className={styles.meta}
          groupClassName={styles.meta__item}
        />
      </footer>
    </article>
  );
};

export default Summary;
