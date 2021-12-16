import PostMeta from '@components/PostMeta/PostMeta';
import { t } from '@lingui/macro';
import { ArticlePreview } from '@ts/types/articles';
import Link from 'next/link';
import ArrowRightIcon from '@assets/images/icon-arrow-right.svg';
import styles from './PostPreview.module.scss';
import Image from 'next/image';

const PostPreview = ({
  post,
  TitleTag,
}: {
  post: ArticlePreview;
  TitleTag: keyof JSX.IntrinsicElements;
}) => {
  return (
    <article className={styles.wrapper}>
      {post.featuredImage && (
        <div className={styles.cover}>
          <Image
            src={post.featuredImage.sourceUrl}
            alt={post.featuredImage.altText}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      <header className={styles.header}>
        <TitleTag>
          <Link href={`/article/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </TitleTag>
      </header>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <footer className={styles.footer}>
        <Link href={post.slug}>
          <a className={styles['read-more']}>
            {t`Read more`}
            <span className="screen-reader-text">
              {' '}
              {t({ message: `about ${post.title}`, comment: 'Post title' })}
            </span>
            <ArrowRightIcon className={styles.icon} />
          </a>
        </Link>
      </footer>
      <PostMeta
        commentCount={post.commentCount}
        publicationDate={post.date.publication}
        updateDate={post.date.update}
        thematics={post.thematics}
      />
    </article>
  );
};

export default PostPreview;
