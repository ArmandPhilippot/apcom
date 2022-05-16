import Link from '@components/atoms/links/link';
import DescriptionList, {
  type DescriptionListProps,
  type DescriptionListItem,
} from '@components/atoms/lists/description-list';
import { getFormattedDate, getFormattedTime } from '@utils/helpers/dates';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';

export type CustomMeta = {
  label: string;
  value: ReactNode | ReactNode[];
};

export type MetaComments = {
  /**
   * A page title.
   */
  about: string;
  /**
   * The comments count.
   */
  count: number;
  /**
   * Wrap the comments count with a link to the given target.
   */
  target?: string;
};

export type MetaDate = {
  /**
   * A date string. Ex: `2022-04-30`.
   */
  date: string;
  /**
   * A time string. Ex: `10:25:59`.
   */
  time?: string;
  /**
   * Wrap the date with a link to the given target.
   */
  target?: string;
};

export type MetaData = {
  /**
   * The author name.
   */
  author?: string;
  /**
   * The comments count.
   */
  comments?: MetaComments;
  /**
   * The creation date.
   */
  creation?: MetaDate;
  /**
   * A custom label/value metadata.
   */
  custom?: CustomMeta;
  /**
   * The license name.
   */
  license?: string;
  /**
   * The popularity.
   */
  popularity?: string | JSX.Element;
  /**
   * The publication date.
   */
  publication?: MetaDate;
  /**
   * The estimated reading time.
   */
  readingTime?: string | JSX.Element;
  /**
   * An array of repositories.
   */
  repositories?: string[] | JSX.Element[];
  /**
   * An array of technologies.
   */
  technologies?: string[];
  /**
   * An array of thematics.
   */
  thematics?: string[] | JSX.Element[];
  /**
   * An array of thematics.
   */
  topics?: string[] | JSX.Element[];
  /**
   * A total number of posts.
   */
  total?: number;
  /**
   * The update date.
   */
  update?: MetaDate;
  /**
   * An url.
   */
  website?: string;
};

export type MetaKey = keyof MetaData;

export type MetaProps = Omit<
  DescriptionListProps,
  'items' | 'withSeparator'
> & {
  /**
   * The meta data.
   */
  data: MetaData;
  /**
   * The items layout.
   */
  itemsLayout?: DescriptionListItem['layout'];
  /**
   * If true, use a slash to delimitate multiple values. Default: true.
   */
  withSeparator?: DescriptionListProps['withSeparator'];
};

/**
 * Meta component
 *
 * Renders the given metadata.
 */
const Meta: FC<MetaProps> = ({
  data,
  itemsLayout = 'inline-values',
  withSeparator = true,
  ...props
}) => {
  const intl = useIntl();

  /**
   * Retrieve the item label based on its key.
   *
   * @param {keyof MetaData} key - The meta key.
   * @returns {string} The item label.
   */
  const getLabel = (key: keyof MetaData): string => {
    switch (key) {
      case 'author':
        return intl.formatMessage({
          defaultMessage: 'Written by:',
          description: 'Meta: author label',
          id: 'OI0N37',
        });
      case 'comments':
        return intl.formatMessage({
          defaultMessage: 'Comments:',
          description: 'Meta: comments label',
          id: 'jTVIh8',
        });
      case 'creation':
        return intl.formatMessage({
          defaultMessage: 'Created on:',
          description: 'Meta: creation date label',
          id: 'b4fdYE',
        });
      case 'license':
        return intl.formatMessage({
          defaultMessage: 'License:',
          description: 'Meta: license label',
          id: 'AuGklx',
        });
      case 'popularity':
        return intl.formatMessage({
          defaultMessage: 'Popularity:',
          description: 'Meta: popularity label',
          id: 'pWTj2W',
        });
      case 'publication':
        return intl.formatMessage({
          defaultMessage: 'Published on:',
          description: 'Meta: publication date label',
          id: 'QGi5uD',
        });
      case 'readingTime':
        return intl.formatMessage({
          defaultMessage: 'Reading time:',
          description: 'Meta: reading time label',
          id: 'EbFvsM',
        });
      case 'repositories':
        return intl.formatMessage({
          defaultMessage: 'Repositories:',
          description: 'Meta: repositories label',
          id: 'DssFG1',
        });
      case 'technologies':
        return intl.formatMessage({
          defaultMessage: 'Technologies:',
          description: 'Meta: technologies label',
          id: 'ADQmDF',
        });
      case 'thematics':
        return intl.formatMessage({
          defaultMessage: 'Thematics:',
          description: 'Meta: thematics label',
          id: 'bz53Us',
        });
      case 'topics':
        return intl.formatMessage({
          defaultMessage: 'Topics:',
          description: 'Meta: topics label',
          id: 'gJNaBD',
        });
      case 'total':
        return intl.formatMessage({
          defaultMessage: 'Total:',
          description: 'Meta: total label',
          id: '92zgdp',
        });
      case 'update':
        return intl.formatMessage({
          defaultMessage: 'Updated on:',
          description: 'Meta: update date label',
          id: 'tLC7bh',
        });
      case 'website':
        return intl.formatMessage({
          defaultMessage: 'Official website:',
          description: 'Meta: official website label',
          id: 'GRyyfy',
        });
      default:
        return '';
    }
  };

  /**
   * Retrieve a formatted date (and time).
   *
   * @param {MetaDate} dateTime - A date object.
   * @returns {JSX.Element} The formatted date wrapped in a time element.
   */
  const getDate = (dateTime: MetaDate): JSX.Element => {
    const { date, time, target } = dateTime;

    if (!dateTime.time) {
      const isoDate = new Date(`${date}`).toISOString();
      return target ? (
        <Link href={target}>
          <time dateTime={isoDate}>{getFormattedDate(dateTime.date)}</time>
        </Link>
      ) : (
        <time dateTime={isoDate}>{getFormattedDate(dateTime.date)}</time>
      );
    }

    const isoDateTime = new Date(`${date}T${time}`).toISOString();
    const dateString = intl.formatMessage(
      {
        defaultMessage: '{date} at {time}',
        description: 'Meta: publication date and time',
        id: 'fcHeyC',
      },
      {
        date: getFormattedDate(dateTime.date),
        time: getFormattedTime(`${dateTime.date}T${dateTime.time}`),
      }
    );

    return target ? (
      <Link href={target}>
        <time dateTime={isoDateTime}>{dateString}</time>
      </Link>
    ) : (
      <time dateTime={isoDateTime}>{dateString}</time>
    );
  };

  /**
   * Retrieve the formatted comments count.
   *
   * @param comments - The comments object.
   * @returns {string | JSX.Element} - The comments count.
   */
  const getCommentsCount = (comments: MetaComments): string | JSX.Element => {
    const { about, count, target } = comments;
    const commentsCount = intl.formatMessage(
      {
        defaultMessage:
          '{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}<a11y> about {title}</a11y>',
        description: 'Meta: comments count',
        id: '02rgLO',
      },
      {
        a11y: (chunks: ReactNode) => (
          <span className="screen-reader-text">{chunks}</span>
        ),
        commentsCount: count,
        title: about,
      }
    );

    return target ? (
      <Link href={target}>{commentsCount as JSX.Element}</Link>
    ) : (
      (commentsCount as JSX.Element)
    );
  };

  /**
   * Retrieve the formatted item value.
   *
   * @param {keyof MetaData} key - The meta key.
   * @param {ValueOf<MetaData>} value - The meta value.
   * @returns {string|ReactNode|ReactNode[]} - The formatted value.
   */
  const getValue = <T extends MetaKey>(
    key: T,
    value: MetaData[T]
  ): string | ReactNode | ReactNode[] => {
    switch (key) {
      case 'comments':
        return getCommentsCount(value as MetaComments);
      case 'creation':
      case 'publication':
      case 'update':
        return getDate(value as MetaDate);
      case 'total':
        return intl.formatMessage(
          {
            defaultMessage:
              '{postsCount, plural, =0 {No articles} one {# article} other {# articles}}',
            description: 'BlogPage: posts count meta',
            id: 'OF5cPz',
          },
          { postsCount: value as number }
        );
      case 'website':
        const url = value as string;
        return (
          <Link href={url} external={true}>
            {url}
          </Link>
        );
      default:
        return value as string | ReactNode | ReactNode[];
    }
  };

  /**
   * Transform the metadata to description list item format.
   *
   * @param {MetaData} items - The meta.
   * @returns {DescriptionListItem[]} The formatted description list items.
   */
  const getItems = (items: MetaData): DescriptionListItem[] => {
    const listItems: DescriptionListItem[] = Object.entries(items)
      .map(([key, value]) => {
        if (!key || !value) return;

        const metaKey = key as MetaKey;

        return {
          id: metaKey,
          label:
            metaKey === 'custom'
              ? (value as CustomMeta).label
              : getLabel(metaKey),
          layout: itemsLayout,
          value:
            metaKey === 'custom' && (value as CustomMeta)
              ? (value as CustomMeta).value
              : getValue(metaKey, value),
        } as DescriptionListItem;
      })
      .filter((item): item is DescriptionListItem => !!item);

    return listItems;
  };

  return (
    <DescriptionList
      items={getItems(data)}
      withSeparator={withSeparator}
      {...props}
    />
  );
};

export default Meta;
