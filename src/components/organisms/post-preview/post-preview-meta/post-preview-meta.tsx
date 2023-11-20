import type { FC, ReactElement, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import type { PageLink } from '../../../../types';
import { getReadingTimeFrom } from '../../../../utils/helpers';
import { Link, Time, VisuallyHidden } from '../../../atoms';
import {
  CardMeta,
  type CardMetaProps,
  MetaItem,
  type MetaItemProps,
} from '../../../molecules';

const a11y = (chunks: ReactNode) => <VisuallyHidden>{chunks}</VisuallyHidden>;

export type PostPreviewMetaComment = {
  /**
   * The number of comments.
   */
  count: number;
  /**
   * The post heading (used to generate an accessible label).
   */
  postHeading: string;
  /**
   * An url to the comments section.
   */
  url?: string;
};

export type PostPreviewMetaData = {
  /**
   * The author name.
   */
  author?: string;
  /**
   * The number of comments on the post and eventually an url to read them.
   */
  comments?: PostPreviewMetaComment;
  /**
   * The publication date of the post.
   */
  publicationDate?: string;
  /**
   * The thematics attached to the post.
   */
  thematics?: PageLink[];
  /**
   * The topics attached to the post.
   */
  topics?: PageLink[];
  /**
   * The last modification date of the post.
   */
  updateDate?: string;
  /**
   * The number of words in the post.
   */
  wordsCount?: number;
};

export type PostPreviewMetaProps = Omit<CardMetaProps, 'children' | 'items'> & {
  /**
   * The post meta.
   */
  meta: PostPreviewMetaData;
};

export const PostPreviewMeta: FC<PostPreviewMetaProps> = ({
  meta,
  ...props
}) => {
  const intl = useIntl();

  const getAuthor = (author: string): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage({
        defaultMessage: 'Written by:',
        description: 'PostPreviewMeta: author label',
        id: '2U7ixo',
      })}
      value={author}
    />
  );

  const getComments = (
    comments: PostPreviewMetaComment
  ): ReactElement<MetaItemProps> => {
    const commentsLabel = intl.formatMessage<ReactNode>(
      {
        defaultMessage:
          '{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}<a11y> about {title}</a11y>',
        description: 'PostPreviewMeta: comments count',
        id: 'NfAn9N',
      },
      {
        a11y,
        commentsCount: comments.count,
        title: comments.postHeading,
      }
    );

    return (
      <MetaItem
        label={intl.formatMessage({
          defaultMessage: 'Comments:',
          description: 'PostPreviewMeta: comments label',
          id: 'FCpPCm',
        })}
        value={
          comments.url ? (
            <Link href={comments.url}>{commentsLabel}</Link>
          ) : (
            <>{commentsLabel}</>
          )
        }
      />
    );
  };

  const getPublicationDate = (date: string): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage({
        defaultMessage: 'Published on:',
        description: 'PostPreviewMeta: publication date label',
        id: '+6f4p1',
      })}
      value={<Time date={date} />}
    />
  );

  const getThematics = (thematics: PageLink[]): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage(
        {
          defaultMessage:
            '{thematicsCount, plural, =0 {Thematics:} one {Thematic:} other {Thematics:}}',
          description: 'PostPreviewMeta: thematics label',
          id: '9MTBCG',
        },
        { thematicsCount: thematics.length }
      )}
      value={thematics.map((thematic) => {
        return {
          id: `thematic-${thematic.id}`,
          value: <Link href={thematic.url}>{thematic.name}</Link>,
        };
      })}
    />
  );

  const getTopics = (topics: PageLink[]): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage(
        {
          defaultMessage:
            '{topicsCount, plural, =0 {Topics:} one {Topic:} other {Topics:}}',
          description: 'PostPreviewMeta: topics label',
          id: 'aBQYbE',
        },
        { topicsCount: topics.length }
      )}
      value={topics.map((topic) => {
        return {
          id: `topic-${topic.id}`,
          value: <Link href={topic.url}>{topic.name}</Link>,
        };
      })}
    />
  );

  const getUpdateDate = (date: string): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage({
        defaultMessage: 'Updated on:',
        description: 'PostPreviewMeta: update date label',
        id: 'ZmRh0V',
      })}
      value={<Time date={date} />}
    />
  );

  const getReadingTime = (wordsCount: number): ReactElement<MetaItemProps> => (
    <MetaItem
      label={intl.formatMessage({
        defaultMessage: 'Reading time:',
        description: 'PostPreviewMeta: reading time label',
        id: 'B1lS/v',
      })}
      value={intl.formatMessage(
        {
          defaultMessage:
            '{minutesCount, plural, =0 {Less than one minute} one {# minute} other {# minutes}}',
          description: 'PostPreviewMeta: rounded minutes count',
          id: 'y+13Ax',
        },
        { minutesCount: getReadingTimeFrom(wordsCount).inMinutes() }
      )}
    />
  );

  return (
    <CardMeta {...props}>
      {meta.author ? getAuthor(meta.author) : null}
      {meta.publicationDate ? getPublicationDate(meta.publicationDate) : null}
      {meta.updateDate && meta.updateDate !== meta.publicationDate
        ? getUpdateDate(meta.updateDate)
        : null}
      {meta.wordsCount ? getReadingTime(meta.wordsCount) : null}
      {meta.thematics ? getThematics(meta.thematics) : null}
      {meta.topics ? getTopics(meta.topics) : null}
      {meta.comments ? getComments(meta.comments) : null}
    </CardMeta>
  );
};
