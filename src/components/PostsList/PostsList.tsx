import useSWRInfinite from 'swr/infinite';
import { t } from '@lingui/macro';
import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/blog';
import { PostsList as PostsListData } from '@ts/types/blog';
import styles from './PostsList.module.scss';
import PostPreview from '@components/PostPreview/PostPreview';
import { Button } from '@components/Buttons';
import { Fragment } from 'react';
import { sortPostsByYear } from '@utils/helpers/sort';

const PostsList = ({ showYears }: { showYears: boolean }) => {
  const titleLevel = showYears ? 3 : 2;

  const getKey = (pageIndex: number, previousData: PostsListData) => {
    if (previousData && !previousData.posts) return null;

    const args =
      pageIndex === 0
        ? { first: config.postsPerPage }
        : {
            first: config.postsPerPage,
            after: previousData.pageInfo.endCursor,
          };

    return args;
  };

  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    getPublishedPosts
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore: boolean =
    isLoadingInitialData ||
    (size > 0 && data !== undefined && typeof data[size - 1] === 'undefined');

  if (error) return <div>{t`Failed to load.`}</div>;
  if (!data) return <div>{t`Loading...`}</div>;

  const getPostsList = () => {
    const posts = sortPostsByYear(data);
    const years = Object.keys(posts).reverse();

    return years.map((year) => {
      return (
        <Fragment key={year}>
          {showYears && <h2>{year}</h2>}
          <ol className={styles.list}>
            {posts[year].map((post) => {
              return (
                <li key={post.id} className={styles.item}>
                  <PostPreview post={post} titleLevel={titleLevel} />
                </li>
              );
            })}
          </ol>
        </Fragment>
      );
    });
  };

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  return (
    <>
      {getPostsList()}
      {hasNextPage && (
        <Button
          isDisabled={isLoadingMore}
          clickHandler={() => setSize(size + 1)}
        >{t`Load more?`}</Button>
      )}
    </>
  );
};

export default PostsList;
