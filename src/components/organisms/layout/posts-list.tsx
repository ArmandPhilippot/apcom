import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import Summary, { type SummaryProps } from './summary';
import styles from './posts-list.module.scss';
import ProgressBar from '@components/atoms/loaders/progress-bar';
import Button from '@components/atoms/buttons/button';

export type Post = SummaryProps & {
  /**
   * The post id.
   */
  id: string | number;
};

export type YearCollection = {
  [key: string]: Post[];
};

export type PostsListProps = {
  /**
   * True to display the posts by year. Default: false.
   */
  byYear?: boolean;
  /**
   * The posts data.
   */
  posts: Post[];
  /**
   * The posts heading level (hn).
   */
  titleLevel?: HeadingLevel;
  /**
   * The total posts number.
   */
  total: number;
};

/**
 * Create a collection of posts sorted by year.
 *
 * @param {Posts[]} data - A collection of posts.
 * @returns {YearCollection} The posts sorted by year.
 */
const sortPostsByYear = (data: Post[]): YearCollection => {
  const yearCollection: YearCollection = {};

  data.forEach((post) => {
    const postYear = new Date(post.meta.dates.publication)
      .getFullYear()
      .toString();
    yearCollection[postYear] = [...(yearCollection[postYear] || []), post];
  });

  return yearCollection;
};

/**
 * PostsList component
 *
 * Render a list of post summaries.
 */
const PostsList: FC<PostsListProps> = ({
  byYear = false,
  posts,
  titleLevel,
  total,
}) => {
  const intl = useIntl();

  /**
   * Retrieve the list of posts.
   *
   * @param {Posts[]} data - A collection fo posts.
   * @param {HeadingLevel} [headingLevel] - The posts heading level (hn).
   * @returns {JSX.Element} The list of posts.
   */
  const getList = (
    data: Post[],
    headingLevel: HeadingLevel = 2
  ): JSX.Element => {
    return (
      <ol className={styles.list}>
        {data.map(({ id, ...post }) => (
          <li key={id} className={styles.item}>
            <Summary {...post} titleLevel={headingLevel} />
          </li>
        ))}
      </ol>
    );
  };

  /**
   * Retrieve the list of posts.
   *
   * @returns {JSX.Element | JSX.Element[]} - The posts list.
   */
  const getPosts = (): JSX.Element | JSX.Element[] => {
    if (!byYear) return getList(posts);

    const postsPerYear = sortPostsByYear(posts);
    const years = Object.keys(postsPerYear).reverse();

    return years.map((year) => {
      return (
        <section key={year} className={styles.section}>
          <Heading level={2} className={styles.year}>
            {year}
          </Heading>
          {getList(postsPerYear[year], titleLevel)}
        </section>
      );
    });
  };

  const progressInfo = intl.formatMessage(
    {
      defaultMessage:
        '{articlesCount, plural, =0 {# loaded articles} one {# loaded article} other {# loaded articles}} out of a total of {total}',
      description: 'PostsList: loaded articles progress',
      id: '9MeLN3',
    },
    { articlesCount: posts.length, total: total }
  );

  const loadMore = intl.formatMessage({
    defaultMessage: 'Load more articles?',
    id: 'uaqd5F',
    description: 'PostsList: load more button',
  });

  return posts.length === 0 ? (
    <p>
      {intl.formatMessage({
        defaultMessage: 'No results found.',
        description: 'PostsList: no results',
        id: 'vK7Sxv',
      })}
    </p>
  ) : (
    <>
      {getPosts()}
      <ProgressBar
        min={1}
        max={total}
        current={posts.length}
        info={progressInfo}
      />
      <Button className={styles.btn}>{loadMore}</Button>
    </>
  );
};

export default PostsList;
