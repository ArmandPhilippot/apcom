import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  type RefCallback,
} from 'react';
import { useIntl } from 'react-intl';
import { mergeRefs } from '../../../utils/helpers';
import {
  Heading,
  type HeadingLevel,
  List,
  ListItem,
  Button,
  ProgressBar,
} from '../../atoms';
import {
  PostPreview,
  type PostPreviewMetaData,
  type PostPreviewProps,
} from '../post-preview';
import styles from './posts-list.module.scss';

const MAX_HEADING_LVL = 6;

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

/**
 * Method to sort PageLink objects by name.
 *
 * @param {PageLink} a - A PageLink object.
 * @param {PageLink} b - Another PageLink object.
 * @returns {1 | -1 | 0}
 */
export const sortPostsByDate = (a: PostData, b: PostData) =>
  new Date(b.meta.publicationDate).getTime() -
  new Date(a.meta.publicationDate).getTime();

const getPostsByYear = (posts: PostData[]) => {
  const yearCollection = new Map<string, PostData[]>();
  const sortedPosts = [...posts].sort(sortPostsByDate);

  for (const post of sortedPosts) {
    const currentPostYear = new Date(post.meta.publicationDate)
      .getFullYear()
      .toString();

    const yearPosts = yearCollection.get(currentPostYear) ?? [];

    yearCollection.set(currentPostYear, [...yearPosts, post]);
  }

  return yearCollection;
};

type GetPostsListOptions = {
  headingLvl: HeadingLevel;
  isOrdered?: boolean;
};

export type PostsListProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * The first new result index. It will be use to make the load more button
   * accessible for keyboard users.
   */
  firstNewResult?: number;
  /**
   * The heading level to use on posts titles.
   *
   * @default 2
   */
  headingLvl?: HeadingLevel;
  /**
   * Should we indicate that new posts are loading?
   *
   * @default false
   */
  isLoading?: boolean;
  /**
   * A callback function to handle loading more posts.
   */
  onLoadMore?: () => void;
  /**
   * The posts.
   */
  posts: PostData[];
  /**
   * Should we use a different section by year?
   */
  sortByYear?: boolean;
  /**
   * The total posts number.
   */
  total?: number;
};

const PostsListWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  PostsListProps
> = (
  {
    firstNewResult,
    headingLvl = 2,
    isLoading = false,
    onLoadMore,
    posts,
    sortByYear = false,
    total,
    ...props
  },
  ref
) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const firstNewResultRef: RefCallback<HTMLLIElement> = useCallback((el) => {
    el?.focus();
  }, []);
  const intl = useIntl();
  const progressInfo = intl.formatMessage(
    {
      defaultMessage:
        '{articlesCount, plural, =0 {# loaded articles} one {# loaded article} other {# loaded articles}} out of a total of {total}',
      description: 'PostsList: loaded articles progress',
      id: '9MeLN3',
    },
    {
      articlesCount: posts.length,
      total,
    }
  );
  const loadMoreBtn = intl.formatMessage({
    defaultMessage: 'Load more posts?',
    description: 'PostsList: load more button',
    id: 'hGvQpI',
  });

  const getPostsList = useCallback(
    (
      data: PostData[],
      { headingLvl: lvl, isOrdered }: GetPostsListOptions,
      indexAcc = 0
    ) => (
      <List
        hideMarker
        isOrdered={isOrdered}
        // eslint-disable-next-line react/jsx-no-literals
        spacing="md"
      >
        {data.map(({ id, ...post }, index) => {
          const isFirstNewResult = firstNewResult === indexAcc + index;

          return (
            <ListItem
              key={id}
              ref={isFirstNewResult ? firstNewResultRef : undefined}
              tabIndex={isFirstNewResult ? -1 : undefined}
            >
              <PostPreview {...post} headingLvl={lvl} />
            </ListItem>
          );
        })}
      </List>
    ),
    [firstNewResult, firstNewResultRef]
  );

  const getSortedPostsList = useCallback(
    (data: PostData[]) => {
      const postsByYear = Array.from(getPostsByYear(data));
      const postsLvl =
        headingLvl < MAX_HEADING_LVL
          ? ((headingLvl + 1) as HeadingLevel)
          : headingLvl;
      let indexAcc = 0;

      return postsByYear.map(([year, sortedPosts], index) => {
        indexAcc +=
          index > 0 ? postsByYear[index - 1][1].length : sortedPosts.length;

        return (
          <section className={styles.section} key={year}>
            <Heading className={styles.year} level={headingLvl}>
              {year}
            </Heading>
            {getPostsList(
              sortedPosts,
              {
                headingLvl: postsLvl,
                isOrdered: true,
              },
              indexAcc
            )}
          </section>
        );
      });
    },
    [getPostsList, headingLvl]
  );

  return (
    <div {...props} ref={mergeRefs([wrapperRef, ref])}>
      {sortByYear
        ? getSortedPostsList(posts)
        : getPostsList(posts, { headingLvl })}
      {total ? (
        <ProgressBar
          aria-label={progressInfo}
          className={styles.progress}
          current={posts.length}
          isCentered
          isLoading={isLoading}
          label={progressInfo}
          max={total}
        />
      ) : null}
      {onLoadMore ? (
        <Button
          className={styles.btn}
          isLoading={isLoading}
          // eslint-disable-next-line react/jsx-no-literals
          kind="tertiary"
          onClick={onLoadMore}
        >
          {loadMoreBtn}
        </Button>
      ) : null}
    </div>
  );
};

export const PostsList = forwardRef(PostsListWithRef);
