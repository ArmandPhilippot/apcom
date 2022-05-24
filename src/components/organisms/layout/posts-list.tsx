import Button from '@components/atoms/buttons/button';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import ProgressBar from '@components/atoms/loaders/progress-bar';
import Spinner from '@components/atoms/loaders/spinner';
import Pagination, {
  type PaginationProps,
} from '@components/molecules/nav/pagination';
import useIsMounted from '@utils/hooks/use-is-mounted';
import useSettings from '@utils/hooks/use-settings';
import { FC, Fragment, useRef } from 'react';
import { useIntl } from 'react-intl';
import NoResults, { NoResultsProps } from './no-results';
import styles from './posts-list.module.scss';
import Summary, { type SummaryProps } from './summary';

export type Post = Omit<SummaryProps, 'titleLevel'> & {
  /**
   * The post id.
   */
  id: string | number;
};

export type YearCollection = {
  [key: string]: Post[];
};

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
  ): JSX.Element => {
    return (
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
  };

  /**
   * Retrieve the list of posts.
   *
   * @returns {JSX.Element | JSX.Element[]} The posts list.
   */
  const getPosts = (): JSX.Element | JSX.Element[] => {
    const firstLevel = titleLevel || 2;
    if (!byYear) return getList(posts, firstLevel);

    const postsPerYear = sortPostsByYear(posts);
    const years = Object.keys(postsPerYear).reverse();
    const nextLevel = (firstLevel + 1) as HeadingLevel;

    return years.map((year) => {
      return (
        <section key={year} className={styles.section}>
          <Heading level={firstLevel} className={styles.year}>
            {year}
          </Heading>
          {getList(postsPerYear[year], nextLevel)}
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

  const loadMoreBody = intl.formatMessage({
    defaultMessage: 'Load more articles?',
    id: 'uaqd5F',
    description: 'PostsList: load more button',
  });

  /**
   * Load more posts handler.
   */
  const loadMorePosts = () => {
    if (lastPostRef.current) {
      lastPostRef.current.focus();
    }

    loadMore && loadMore();
  };

  const getProgressBar = () => {
    return (
      <>
        <ProgressBar
          min={1}
          max={total}
          current={posts.length}
          info={progressInfo}
        />
        {showLoadMoreBtn && (
          <Button
            kind="tertiary"
            onClick={loadMorePosts}
            disabled={isLoading}
            className={styles.btn}
          >
            {loadMoreBody}
          </Button>
        )}
      </>
    );
  };

  const getPagination = () => {
    return posts.length <= blog.postsPerPage ? (
      <Pagination
        baseUrl={baseUrl}
        current={pageNumber}
        perPage={blog.postsPerPage}
        siblings={siblings}
        total={total}
      />
    ) : (
      <></>
    );
  };

  if (posts.length === 0) {
    return <NoResults searchPage={searchPage} />;
  }

  return (
    <>
      {getPosts()}
      {isLoading && <Spinner />}
      {isMounted ? getProgressBar() : getPagination()}
    </>
  );
};

export default PostsList;
