import Link from 'next/link';
import { ArticlePreview } from '@ts/types/articles';
import styles from './PostsList.module.scss';

type TitleLevel = 2 | 3 | 4 | 5 | 6;

const PostsList = ({
  posts,
  titleLevel,
}: {
  posts: ArticlePreview[];
  titleLevel: TitleLevel;
}) => {
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  const postsList = posts.map((post) => {
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

  return <ol className={styles.wrapper}>{postsList}</ol>;
};

export default PostsList;
