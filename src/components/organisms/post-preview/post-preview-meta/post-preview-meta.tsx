import type { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import type { PageLink } from '../../../../types';
import { getReadingTimeFrom } from '../../../../utils/helpers';
import { Link, Time, VisuallyHidden } from '../../../atoms';
import {
  CardMeta,
  type MetaItemData,
  type CardMetaProps,
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

const validMetaKeys = [
  'author',
  'comments',
  'publicationDate',
  'thematics',
  'topics',
  'updateDate',
  'wordsCount',
] satisfies (keyof PostPreviewMetaData)[];

const isValidMetaKey = (key: string): key is keyof PostPreviewMetaData =>
  (validMetaKeys as string[]).includes(key);

export type PostPreviewMetaProps = Omit<CardMetaProps, 'items'> & {
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

  const getAuthor = (): MetaItemData | undefined => {
    if (!meta.author) return undefined;

    return {
      id: 'author',
      label: intl.formatMessage({
        defaultMessage: 'Written by:',
        description: 'PostPreviewMeta: author label',
        id: '2U7ixo',
      }),
      value: meta.author,
    };
  };

  const getCommentsCount = (): MetaItemData | undefined => {
    if (!meta.comments) return undefined;

    const commentsLabel = intl.formatMessage<ReactNode>(
      {
        defaultMessage:
          '{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}<a11y> about {title}</a11y>',
        description: 'PostPreviewMeta: comments count',
        id: 'NfAn9N',
      },
      {
        a11y,
        commentsCount: meta.comments.count,
        title: meta.comments.postHeading,
      }
    );

    return {
      id: 'comments',
      label: intl.formatMessage({
        defaultMessage: 'Comments:',
        description: 'PostPreviewMeta: comments label',
        id: 'FCpPCm',
      }),
      value: meta.comments.url ? (
        <Link href={meta.comments.url}>{commentsLabel}</Link>
      ) : (
        <>{commentsLabel}</>
      ),
    };
  };

  const getPublicationDate = (): MetaItemData | undefined => {
    if (!meta.publicationDate) return undefined;

    return {
      id: 'publication-date',
      label: intl.formatMessage({
        defaultMessage: 'Published on:',
        description: 'PostPreviewMeta: publication date label',
        id: '+6f4p1',
      }),
      value: <Time date={meta.publicationDate} />,
    };
  };

  const getThematics = (): MetaItemData | undefined => {
    if (!meta.thematics?.length) return undefined;

    return {
      id: 'thematics',
      label: intl.formatMessage(
        {
          defaultMessage:
            '{thematicsCount, plural, =0 {Thematics:} one {Thematic:} other {Thematics:}}',
          description: 'PostPreviewMeta: thematics label',
          id: '9MTBCG',
        },
        { thematicsCount: meta.thematics.length }
      ),
      value: meta.thematics.map((thematic) => {
        return {
          id: `thematic-${thematic.id}`,
          value: <Link href={thematic.url}>{thematic.name}</Link>,
        };
      }),
    };
  };

  const getTopics = (): MetaItemData | undefined => {
    if (!meta.topics?.length) return undefined;

    return {
      id: 'topics',
      label: intl.formatMessage(
        {
          defaultMessage:
            '{topicsCount, plural, =0 {Topics:} one {Topic:} other {Topics:}}',
          description: 'PostPreviewMeta: topics label',
          id: 'aBQYbE',
        },
        { topicsCount: meta.topics.length }
      ),
      value: meta.topics.map((topic) => {
        return {
          id: `topic-${topic.id}`,
          value: <Link href={topic.url}>{topic.name}</Link>,
        };
      }),
    };
  };

  const getUpdateDate = (): MetaItemData | undefined => {
    if (!meta.updateDate || meta.updateDate === meta.publicationDate)
      return undefined;

    return {
      id: 'update-date',
      label: intl.formatMessage({
        defaultMessage: 'Updated on:',
        description: 'PostPreviewMeta: update date label',
        id: 'ZmRh0V',
      }),
      value: <Time date={meta.updateDate} />,
    };
  };

  const getReadingTime = (): MetaItemData | undefined => {
    if (!meta.wordsCount) return undefined;

    return {
      id: 'reading-time',
      label: intl.formatMessage({
        defaultMessage: 'Reading time:',
        description: 'PostPreviewMeta: reading time label',
        id: 'B1lS/v',
      }),
      value: intl.formatMessage(
        {
          defaultMessage:
            '{minutesCount, plural, =0 {Less than one minute} one {# minute} other {# minutes}}',
          description: 'PostPreviewMeta: rounded minutes count',
          id: 'y+13Ax',
        },
        { minutesCount: getReadingTimeFrom(meta.wordsCount).inMinutes() }
      ),
    };
  };

  const items: MetaItemData[] = Object.keys(meta)
    .filter(isValidMetaKey)
    .map((key): MetaItemData | undefined => {
      switch (key) {
        case 'author':
          return getAuthor();
        case 'comments':
          return getCommentsCount();
        case 'publicationDate':
          return getPublicationDate();
        case 'thematics':
          return getThematics();
        case 'topics':
          return getTopics();
        case 'updateDate':
          return getUpdateDate();
        case 'wordsCount':
          return getReadingTime();
        default:
          throw new Error('Unsupported meta key.');
      }
    })
    .filter((item): item is MetaItemData => item !== undefined);

  return <CardMeta {...props} items={items} />;
};
