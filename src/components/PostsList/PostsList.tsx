import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';
import { t } from '@lingui/macro';
import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/blog';
import { ArticlePreview } from '@ts/types/articles';
import { PageInfo } from '@ts/types/pagination';
import styles from './PostsList.module.scss';

type TitleLevel = 2 | 3 | 4 | 5 | 6;

type DataType = {
  posts: ArticlePreview;
  pageInfo: PageInfo;
};

const PostsList = ({ titleLevel }: { titleLevel: TitleLevel }) => {
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  const getKey = (pageIndex: number, previousData: DataType) => {
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

  const getPostsList = () => {
    if (error) return <div>{t`Failed to load.`}</div>;
    if (!data) return <div>{t`Loading...`}</div>;

    return data.map((page) => {
      if (page.posts.length === 0) {
        return t`No results found.`;
      } else {
        return page.posts.map((post) => {
          return (
            <li key={post.id}>
              <article>
                <header>
                  <TitleTag>
                    <Link href={`/article/${post.slug}`}>
                      <a>{post.title}</a>
                    </Link>
                  </TitleTag>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              </article>
            </li>
          );
        });
      }
    });
  };

  const hasNextPage = data && data[data.length - 1].pageInfo.hasNextPage;

  return (
    <ol className={styles.wrapper}>
      {getPostsList()}
      {hasNextPage && (
        <button
          disabled={isLoadingMore}
          type="button"
          onClick={() => setSize(size + 1)}
        >{t`Load more?`}</button>
      )}
    </ol>
  );
};

export default PostsList;
