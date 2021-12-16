import useSWRInfinite from 'swr/infinite';
import { t } from '@lingui/macro';
import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/blog';
import { PostsList as PostsListData } from '@ts/types/blog';
import styles from './PostsList.module.scss';
import PostPreview from '@components/PostPreview/PostPreview';
import { Button } from '@components/Buttons';

type TitleLevel = 2 | 3 | 4 | 5 | 6;

const PostsList = ({ titleLevel }: { titleLevel: TitleLevel }) => {
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

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
    return data.map((page) => {
      if (page.posts.length === 0) {
        return t`No results found.`;
      } else {
        return page.posts.map((post) => {
          return (
            <li key={post.id} className={styles.item}>
              <PostPreview post={post} TitleTag={TitleTag} />
            </li>
          );
        });
      }
    });
  };

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  return (
    <>
      <ol className={styles.wrapper}>{getPostsList()}</ol>
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
