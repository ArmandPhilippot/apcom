import PostPreview from '@components/PostPreview/PostPreview';
import { PostsList as PostsListData } from '@ts/types/blog';
import { sortPostsByYear } from '@utils/helpers/sort';
import { ForwardedRef, forwardRef, Fragment } from 'react';
import { useIntl } from 'react-intl';
import styles from './PostsList.module.scss';

const PostsList = (
  {
    data,
    showYears,
  }: {
    data: PostsListData[];
    showYears: boolean;
  },
  ref: ForwardedRef<HTMLSpanElement>
) => {
  const intl = useIntl();
  const titleLevel = showYears ? 3 : 2;

  const getPostsListByYear = () => {
    const posts = sortPostsByYear(data);
    const years = Object.keys(posts).reverse();

    const getLastPostId = () => {
      const oldestYear = Object.keys(posts)[0];
      const lastPost = posts[oldestYear][posts[oldestYear].length - 1];
      return lastPost.id;
    };

    return years.map((year) => {
      return (
        <section key={year} className={styles.section}>
          {showYears && (
            <h2 className={styles.year}>
              <span className="screen-reader-text">
                {intl.formatMessage({
                  defaultMessage: 'Published on',
                  description: 'PostsList: published on year label',
                })}{' '}
              </span>
              {year}
            </h2>
          )}
          <ol className={styles.list}>
            {posts[year].map((post) => {
              const isLastPost = post.id === getLastPostId();
              return (
                <Fragment key={post.id}>
                  <li className={styles.item}>
                    <PostPreview post={post} titleLevel={titleLevel} />
                  </li>
                  {isLastPost && <span ref={ref} tabIndex={-1} />}
                </Fragment>
              );
            })}
          </ol>
        </section>
      );
    });
  };

  const getPostsList = () => {
    return data.map((page) => {
      const getLastPostId = () => {
        const lastPost = page.posts[page.posts.length - 1];
        return lastPost.id;
      };

      if (page.posts.length === 0) {
        return (
          <p key="no-result">
            {intl.formatMessage({
              defaultMessage: 'No results found.',
              description: 'PostsList: no results',
            })}
          </p>
        );
      } else {
        return (
          <Fragment key={page.pageInfo.endCursor}>
            <ol className={styles.list}>
              {page.posts.map((post) => {
                const isLastPost = post.id === getLastPostId();
                return (
                  <Fragment key={post.id}>
                    <li key={post.id} className={styles.item}>
                      <PostPreview post={post} titleLevel={titleLevel} />
                    </li>
                    {isLastPost && <span ref={ref} tabIndex={-1} />}
                  </Fragment>
                );
              })}
            </ol>
          </Fragment>
        );
      }
    });
  };

  return <div>{showYears ? getPostsListByYear() : getPostsList()}</div>;
};

export default forwardRef(PostsList);
