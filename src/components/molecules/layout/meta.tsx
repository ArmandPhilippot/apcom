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
  commentsCount?: string | JSX.Element;
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
   * A total.
   */
  total?: string;
  /**
   * The update date.
   */
  update?: MetaDate;
};

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
          id: 'OI0N37',
          description: 'Meta: author label',
        });
      case 'commentsCount':
        return intl.formatMessage({
          defaultMessage: 'Comments:',
          id: 'jTVIh8',
          description: 'Meta: comments label',
        });
      case 'creation':
        return intl.formatMessage({
          defaultMessage: 'Created on:',
          id: 'b4fdYE',
          description: 'Meta: creation date label',
        });
      case 'license':
        return intl.formatMessage({
          defaultMessage: 'License:',
          id: 'AuGklx',
          description: 'Meta: license label',
        });
      case 'popularity':
        return intl.formatMessage({
          defaultMessage: 'Popularity:',
          id: 'pWTj2W',
          description: 'Meta: popularity label',
        });
      case 'publication':
        return intl.formatMessage({
          defaultMessage: 'Published on:',
          id: 'QGi5uD',
          description: 'Meta: publication date label',
        });
      case 'readingTime':
        return intl.formatMessage({
          defaultMessage: 'Reading time:',
          id: 'EbFvsM',
          description: 'Meta: reading time label',
        });
      case 'repositories':
        return intl.formatMessage({
          defaultMessage: 'Repositories:',
          id: 'DssFG1',
          description: 'Meta: repositories label',
        });
      case 'technologies':
        return intl.formatMessage({
          defaultMessage: 'Technologies:',
          id: 'ADQmDF',
          description: 'Meta: technologies label',
        });
      case 'thematics':
        return intl.formatMessage({
          defaultMessage: 'Thematics:',
          id: 'bz53Us',
          description: 'Meta: thematics label',
        });
      case 'topics':
        return intl.formatMessage({
          defaultMessage: 'Topics:',
          id: 'gJNaBD',
          description: 'Meta: topics label',
        });
      case 'total':
        return intl.formatMessage({
          defaultMessage: 'Total:',
          id: '92zgdp',
          description: 'Meta: total label',
        });
      case 'update':
        return intl.formatMessage({
          defaultMessage: 'Updated on:',
          id: 'tLC7bh',
          description: 'Meta: update date label',
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

    return target ? (
      <Link href={target}>
        <time dateTime={isoDateTime}>
          {intl.formatMessage(
            {
              defaultMessage: '{date} at {time}',
              description: 'Meta: publication date and time',
              id: 'fcHeyC',
            },
            {
              date: getFormattedDate(dateTime.date),
              time: getFormattedTime(`${dateTime.date}T${dateTime.time}`),
            }
          )}
        </time>
      </Link>
    ) : (
      <time dateTime={isoDateTime}>
        {intl.formatMessage(
          {
            defaultMessage: '{date} at {time}',
            description: 'Meta: publication date and time',
            id: 'fcHeyC',
          },
          {
            date: getFormattedDate(dateTime.date),
            time: getFormattedTime(`${dateTime.date}T${dateTime.time}`),
          }
        )}
      </time>
    );
  };

  /**
   * Retrieve the formatted item value.
   *
   * @param {keyof MetaData} key - The meta key.
   * @param {ValueOf<MetaData>} value - The meta value.
   * @returns {string|ReactNode|ReactNode[]} - The formatted value.
   */
  const getValue = <T extends keyof MetaData>(
    key: T,
    value: MetaData[T]
  ): string | ReactNode | ReactNode[] => {
    if (key === 'creation' || key === 'publication' || key === 'update') {
      return getDate(value as MetaDate);
    }
    return value as string | ReactNode | ReactNode[];
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

        const metaKey = key as keyof MetaData;

        return {
          id: metaKey,
          label:
            metaKey === 'custom'
              ? (value as CustomMeta).label
              : getLabel(metaKey),
          layout: itemsLayout,
          value:
            metaKey === 'custom'
              ? (value as CustomMeta).value
              : getValue(
                  metaKey,
                  value as string | string[] | JSX.Element | JSX.Element[]
                ),
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
