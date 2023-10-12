import NextImage, { type ImageProps as NextImageProps } from 'next/image';
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
  Figure,
  Time,
} from '../../atoms';
import { MetaList, type MetaItemData } from '../../molecules';
import styles from './summary.module.scss';

export type Cover = Pick<NextImageProps, 'alt' | 'src' | 'width' | 'height'>;

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
  const readingTime = useReadingTime(meta.wordsCount, true);

  const getMetaItems = (): MetaItemData[] => {
    const summaryMeta: MetaItemData[] = [
      {
        id: 'publication-date',
        label: intl.formatMessage({
          defaultMessage: 'Published on:',
          description: 'Summary: publication date label',
          id: 'TvQ2Ee',
        }),
        value: <Time date={meta.dates.publication} />,
      },
    ];

    if (meta.dates.update && meta.dates.update !== meta.dates.publication)
      summaryMeta.push({
        id: 'update-date',
        label: intl.formatMessage({
          defaultMessage: 'Updated on:',
          description: 'Summary: update date label',
          id: 'f0Z/Po',
        }),
        value: <Time date={meta.dates.update} />,
      });

    summaryMeta.push({
      id: 'reading-time',
      label: intl.formatMessage({
        defaultMessage: 'Reading time:',
        description: 'Summary: reading time label',
        id: 'tyzdql',
      }),
      value: readingTime,
    });

    if (meta.author)
      summaryMeta.push({
        id: 'author',
        label: intl.formatMessage({
          defaultMessage: 'Written by:',
          description: 'Summary: author label',
          id: 'r/6HOI',
        }),
        value: meta.author.name,
      });

    if (meta.thematics)
      summaryMeta.push({
        id: 'thematics',
        label: intl.formatMessage({
          defaultMessage: 'Thematics:',
          description: 'Summary: thematics label',
          id: 'bk0WOp',
        }),
        value: meta.thematics.map((thematic) => {
          return {
            id: `thematic-${thematic.id}`,
            value: <Link href={thematic.url}>{thematic.name}</Link>,
          };
        }),
      });

    if (meta.topics)
      summaryMeta.push({
        id: 'topics',
        label: intl.formatMessage({
          defaultMessage: 'Topics:',
          description: 'Summary: topics label',
          id: 'yIZ+AC',
        }),
        value: meta.topics.map((topic) => {
          return {
            id: `topic-${topic.id}`,
            value: <Link href={topic.url}>{topic.name}</Link>,
          };
        }),
      });

    if (meta.commentsCount !== undefined) {
      const commentsCount = intl.formatMessage(
        {
          defaultMessage:
            '{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}<a11y> about {title}</a11y>',
          description: 'Summary: comments count',
          id: 'ye/vlA',
        },
        {
          a11y: (chunks: ReactNode) => (
            <span className="screen-reader-text">{chunks}</span>
          ),
          commentsCount: meta.commentsCount,
          title,
        }
      );
      summaryMeta.push({
        id: 'comments-count',
        label: intl.formatMessage({
          defaultMessage: 'Comments:',
          description: 'Summary: comments label',
          id: 'bfPp0g',
        }),
        value: (
          <Link href={`${url}#comments`}>{commentsCount as JSX.Element}</Link>
        ),
      });
    }

    return summaryMeta;
  };

  return (
    <article className={styles.wrapper}>
      {meta.cover ? (
        <Figure>
          <NextImage {...meta.cover} className={styles.cover} />
        </Figure>
      ) : null}
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
          {readMore}
          <Icon
            aria-hidden={true}
            className={styles.icon}
            // eslint-disable-next-line react/jsx-no-literals -- Direction allowed
            orientation="right"
            // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
            shape="arrow"
          />
        </ButtonLink>
      </div>
      <footer className={styles.footer}>
        <MetaList className={styles.meta} items={getMetaItems()} />
      </footer>
    </article>
  );
};
