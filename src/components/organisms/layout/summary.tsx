import type { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import type { Article, Meta as MetaType } from '../../../types';
import { useReadingTime } from '../../../utils/hooks';
import {
  ButtonLink,
  Heading,
  type HeadingLevel,
  Icon,
  Link,
} from '../../atoms';
import {
  Meta,
  type MetaData,
  ResponsiveImage,
  type ResponsiveImageProps,
} from '../../molecules';
import styles from './summary.module.scss';

export type Cover = Pick<
  ResponsiveImageProps,
  'alt' | 'src' | 'width' | 'height'
>;

export type SummaryMeta = Pick<
  MetaType<'article'>,
  | 'author'
  | 'commentsCount'
  | 'cover'
  | 'dates'
  | 'thematics'
  | 'topics'
  | 'wordsCount'
>;

export type SummaryProps = Pick<Article, 'intro' | 'title'> & {
  /**
   * The post metadata.
   */
  meta: SummaryMeta;
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
export const Summary: FC<SummaryProps> = ({
  intro,
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
        // eslint-disable-next-line react/jsx-no-literals -- SR class allowed
        <span className="screen-reader-text">{chunks}</span>
      ),
    }
  );
  const { author, commentsCount, cover, dates, thematics, topics, wordsCount } =
    meta;
  const readingTime = useReadingTime(wordsCount, true);

  const getMeta = (): MetaData => {
    return {
      author: author?.name,
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
        count: commentsCount ?? 0,
        target: `${url}#comments`,
      },
    };
  };

  return (
    <article className={styles.wrapper}>
      {cover ? <ResponsiveImage className={styles.cover} {...cover} /> : null}
      <header className={styles.header}>
        <Link href={url} className={styles.link}>
          <Heading level={titleLevel} className={styles.title}>
            {title}
          </Heading>
        </Link>
      </header>
      <div className={styles.body}>
        <div
          className={styles.intro}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <ButtonLink className={styles['read-more']} to={url}>
          <>
            {readMore}
            <Icon
              aria-hidden={true}
              className={styles.icon}
              // eslint-disable-next-line react/jsx-no-literals -- Direction allowed
              orientation="right"
              // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
              shape="arrow"
            />
          </>
        </ButtonLink>
      </div>
      <footer className={styles.footer}>
        <Meta className={styles.meta} data={getMeta()} spacing="xs" />
      </footer>
    </article>
  );
};
