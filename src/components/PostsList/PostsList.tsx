import { t } from '@lingui/macro';
import { PostsList as PostsListData } from '@ts/types/blog';
import styles from './PostsList.module.scss';
import PostPreview from '@components/PostPreview/PostPreview';
import { Fragment } from 'react';
import { sortPostsByYear } from '@utils/helpers/sort';

const PostsList = ({
  data,
  showYears,
}: {
  data: PostsListData[];
  showYears: boolean;
}) => {
  const titleLevel = showYears ? 3 : 2;

  const getPostsListByYear = () => {
    const posts = sortPostsByYear(data);
    const years = Object.keys(posts).reverse();

    return years.map((year) => {
      return (
        <section key={year} className={styles.section}>
          {showYears && (
            <h2 className={styles.year}>
              <span className="screen-reader-text">{t`Published in`} </span>
              {year}
            </h2>
          )}
          <ol className={styles.list}>
            {posts[year].map((post) => {
              return (
                <li key={post.id} className={styles.item}>
                  <PostPreview post={post} titleLevel={titleLevel} />
                </li>
              );
            })}
          </ol>
        </section>
      );
    });
  };

  const getPostsList = () => {
    return data.map((page) => {
      if (page.posts.length === 0) {
        return <p key="no-result">{t`No results found.`}</p>;
      } else {
        return (
          <Fragment key={page.pageInfo.endCursor}>
            <ol className={styles.list}>
              {page.posts.map((post) => {
                return (
                  <li key={post.id} className={styles.item}>
                    <PostPreview post={post} titleLevel={titleLevel} />
                  </li>
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

export default PostsList;
