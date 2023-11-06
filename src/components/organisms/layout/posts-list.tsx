/* eslint-disable max-statements */
import { type FC, Fragment, useRef, useCallback, useId } from 'react';
import { useIntl } from 'react-intl';
import { useIsMounted, useSettings } from '../../../utils/hooks';
import {
  Button,
  Heading,
  type HeadingLevel,
  ProgressBar,
  Spinner,
  List,
  ListItem,
} from '../../atoms';
import {
  Pagination,
  type PaginationProps,
  type RenderPaginationItemAriaLabel,
  type RenderPaginationLink,
} from '../nav';
import {
  PostPreview,
  type PostPreviewMetaData,
  type PostPreviewProps,
} from '../post-preview';
import { NoResults } from './no-results';
import styles from './posts-list.module.scss';

export type PostData = Pick<
  PostPreviewProps,
  'cover' | 'excerpt' | 'heading' | 'url'
> & {
  /**
   * The post id.
   */
  id: string | number;
  /**
   * The post meta.
   */
  meta: PostPreviewMetaData &
    Required<Pick<PostPreviewMetaData, 'publicationDate'>>;
};

export type YearCollection = Record<string, PostData[]>;

export type PostsListProps = Pick<PaginationProps, 'siblings'> & {
  /**
   * The pagination base url.
   */
  baseUrl?: string;
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
  posts: PostData[];
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
 * @param {PostData[]} data - A collection of posts.
 * @returns {YearCollection} The posts sorted by year.
 */
const sortPostsByYear = (data: PostData[]): YearCollection => {
  const yearCollection: Partial<YearCollection> = {};

  data.forEach((post) => {
    const postYear = new Date(post.meta.publicationDate)
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
  baseUrl = '',
  byYear = false,
  isLoading = false,
  loadMore,
  pageNumber = 1,
  posts,
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
  const progressBarId = useId();

  /**
   * Retrieve the list of posts.
   *
   * @param {PostData[]} allPosts - A collection fo posts.
   * @param {HeadingLevel} [headingLevel] - The posts heading level (hn).
   * @returns {JSX.Element} The list of posts.
   */
  const getList = (
    allPosts: PostData[],
    headingLevel: HeadingLevel = 2
  ): JSX.Element => (
    <List
      aria-busy={isLoading}
      aria-describedby={progressBarId}
      className={styles.list}
      hideMarker
      isOrdered
      ref={listRef}
      spacing="md"
    >
      {allPosts.map(({ id, ...post }) => (
        <Fragment key={id}>
          <ListItem className={styles.item}>
            <PostPreview {...post} headingLvl={headingLevel} />
          </ListItem>
          {id === lastPostId && (
            <ListItem>
              <span ref={lastPostRef} tabIndex={-1} />
            </ListItem>
          )}
        </Fragment>
      ))}
    </List>
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

  const loadedPostsCount =
    pageNumber === 1
      ? posts.length
      : pageNumber * blog.postsPerPage + posts.length;
  const progressInfo = intl.formatMessage(
    {
      defaultMessage:
        '{articlesCount, plural, =0 {# loaded articles} one {# loaded article} other {# loaded articles}} out of a total of {total}',
      description: 'PostsList: loaded articles progress',
      id: '9MeLN3',
    },
    {
      articlesCount: loadedPostsCount,
      total,
    }
  );

  const loadMoreBody = intl.formatMessage({
    defaultMessage: 'Load more articles?',
    description: 'PostsList: load more button',
    id: 'uaqd5F',
  });

  const loadingMoreArticles = intl.formatMessage({
    defaultMessage: 'Loading more articles...',
    description: 'PostsList: loading more articles message',
    id: 'xYemkP',
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
        className={styles.progress}
        current={loadedPostsCount}
        id={progressBarId}
        isCentered
        isLoading={isLoading}
        label={progressInfo}
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

  const paginationAriaLabel = intl.formatMessage({
    defaultMessage: 'Pagination',
    description: 'PostsList: pagination accessible name',
    id: 'k1aA+G',
  });

  const renderItemAriaLabel: RenderPaginationItemAriaLabel = useCallback(
    ({ kind, pageNumber: page, isCurrentPage }) => {
      switch (kind) {
        case 'backward':
          return intl.formatMessage({
            defaultMessage: 'Go to previous page',
            description: 'PostsList: pagination backward link label',
            id: 'PHO94k',
          });
        case 'forward':
          return intl.formatMessage({
            defaultMessage: 'Go to next page',
            description: 'PostsList: pagination forward link label',
            id: 'HaKhih',
          });
        case 'number':
        default:
          return isCurrentPage
            ? intl.formatMessage(
                {
                  defaultMessage: 'Current page, page {number}',
                  description: 'PostsList: pagination current page label',
                  id: 'nwDGkZ',
                },
                { number: page }
              )
            : intl.formatMessage(
                {
                  defaultMessage: 'Go to page {number}',
                  description: 'PostsList: pagination page link label',
                  id: 'AmHSC4',
                },
                { number: page }
              );
      }
    },
    [intl]
  );

  const renderLink: RenderPaginationLink = useCallback(
    (page) => `${baseUrl}${page}`,
    [baseUrl]
  );

  const getPagination = () => {
    if (total < blog.postsPerPage) return null;

    return (
      <Pagination
        aria-label={paginationAriaLabel}
        className={styles.pagination}
        current={pageNumber}
        renderItemAriaLabel={renderItemAriaLabel}
        renderLink={renderLink}
        siblings={siblings}
        total={Math.round(total / blog.postsPerPage)}
      />
    );
  };

  if (posts.length === 0) return <NoResults />;

  return (
    <>
      {getPosts()}
      {isLoading ? <Spinner>{loadingMoreArticles}</Spinner> : null}
      {isMounted ? getProgressBar() : getPagination()}
    </>
  );
};
