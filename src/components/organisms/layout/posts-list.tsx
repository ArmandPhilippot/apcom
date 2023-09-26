/* eslint-disable max-statements */
import { type FC, Fragment, useRef, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useIsMounted, useSettings } from '../../../utils/hooks';
import {
  Button,
  Heading,
  type HeadingLevel,
  ProgressBar,
  Spinner,
} from '../../atoms';
import { Pagination, type PaginationProps } from '../../molecules';
import { NoResults, type NoResultsProps } from './no-results';
import styles from './posts-list.module.scss';
import { Summary, type SummaryProps } from './summary';

export type Post = Omit<SummaryProps, 'titleLevel'> & {
  /**
   * The post id.
   */
  id: string | number;
};

export type YearCollection = Record<string, Post[]>;

export type PostsListProps = Pick<PaginationProps, 'baseUrl' | 'siblings'> &
  Pick<NoResultsProps, 'searchPage'> & {
    /**
     * True to display the posts by year. Default: false.
     */
    byYear?: boolean;
    /**
     * Determine if the data is loading.
     */
    isLoading?: boolean;
    /**
     * Load more button handler.
     */
    loadMore?: () => void;
    /**
     * The current page number. Default: 1.
     */
    pageNumber?: number;
    /**
     * The posts data.
     */
    posts: Post[];
    /**
     * Determine if the load more button should be visible.
     */
    showLoadMoreBtn?: boolean;
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
  const yearCollection: Partial<YearCollection> = {};

  data.forEach((post) => {
    const postYear = new Date(post.meta.dates.publication)
      .getFullYear()
      .toString();
    yearCollection[postYear] = [...(yearCollection[postYear] ?? []), post];
  });

  return yearCollection as YearCollection;
};

/**
 * PostsList component
 *
 * Render a list of post summaries.
 */
export const PostsList: FC<PostsListProps> = ({
  baseUrl,
  byYear = false,
  isLoading = false,
  loadMore,
  pageNumber = 1,
  posts,
  searchPage,
  showLoadMoreBtn = false,
  siblings,
  titleLevel,
  total,
}) => {
  const intl = useIntl();
  const listRef = useRef<HTMLOListElement>(null);
  const lastPostRef = useRef<HTMLSpanElement>(null);
  const isMounted = useIsMounted(listRef);
  const { blog } = useSettings();
  const lastPostId = posts.length ? posts[posts.length - 1].id : 0;

  /**
   * Retrieve the list of posts.
   *
   * @param {Posts[]} allPosts - A collection fo posts.
   * @param {HeadingLevel} [headingLevel] - The posts heading level (hn).
   * @returns {JSX.Element} The list of posts.
   */
  const getList = (
    allPosts: Post[],
    headingLevel: HeadingLevel = 2
  ): JSX.Element => (
    <ol className={styles.list} ref={listRef}>
      {allPosts.map(({ id, ...post }) => (
        <Fragment key={id}>
          <li className={styles.item}>
            <Summary {...post} titleLevel={headingLevel} />
          </li>
          {id === lastPostId && (
            <li>
              <span ref={lastPostRef} tabIndex={-1} />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );

  /**
   * Retrieve the list of posts.
   *
   * @returns {JSX.Element | JSX.Element[]} The posts list.
   */
  const getPosts = (): JSX.Element | JSX.Element[] => {
    const firstLevel = titleLevel ?? 2;
    if (!byYear) return getList(posts, firstLevel);

    const postsPerYear = sortPostsByYear(posts);
    const years = Object.keys(postsPerYear).reverse();
    const nextLevel = (firstLevel + 1) as HeadingLevel;

    return years.map((year) => (
      <section key={year} className={styles.section}>
        <Heading level={firstLevel} className={styles.year}>
          {year}
        </Heading>
        {getList(postsPerYear[year], nextLevel)}
      </section>
    ));
  };

  const progressInfo = intl.formatMessage(
    {
      defaultMessage:
        '{articlesCount, plural, =0 {# loaded articles} one {# loaded article} other {# loaded articles}} out of a total of {total}',
      description: 'PostsList: loaded articles progress',
      id: '9MeLN3',
    },
    { articlesCount: posts.length, total }
  );

  const loadMoreBody = intl.formatMessage({
    defaultMessage: 'Load more articles?',
    id: 'uaqd5F',
    description: 'PostsList: load more button',
  });

  /**
   * Load more posts handler.
   */
  const loadMorePosts = useCallback(() => {
    if (lastPostRef.current) {
      lastPostRef.current.focus();
    }

    if (loadMore) loadMore();
  }, [loadMore]);

  const getProgressBar = () => (
    <>
      <ProgressBar
        aria-label={progressInfo}
        current={posts.length}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed.
        id="loaded-posts"
        label={progressInfo}
        min={1}
        max={total}
      />
      {showLoadMoreBtn ? (
        <Button
          className={styles.btn}
          isDisabled={isLoading}
          // eslint-disable-next-line react/jsx-no-literals -- Kind allowed.
          kind="tertiary"
          onClick={loadMorePosts}
        >
          {loadMoreBody}
        </Button>
      ) : null}
    </>
  );

  const getPagination = () => {
    if (posts.length < blog.postsPerPage) return null;

    return (
      <Pagination
        baseUrl={baseUrl}
        current={pageNumber}
        perPage={blog.postsPerPage}
        siblings={siblings}
        total={total}
      />
    );
  };

  if (posts.length === 0) return <NoResults searchPage={searchPage} />;

  return (
    <>
      {getPosts()}
      {isLoading ? <Spinner /> : null}
      {isMounted ? getProgressBar() : getPagination()}
    </>
  );
};
