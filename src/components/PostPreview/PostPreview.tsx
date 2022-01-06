import PostMeta from '@components/PostMeta/PostMeta';
import { t } from '@lingui/macro';
import { ArticleMeta, ArticlePreview } from '@ts/types/articles';
import Link from 'next/link';
import styles from './PostPreview.module.scss';
import Image from 'next/image';
import { ButtonLink } from '@components/Buttons';
import { ArrowIcon } from '@components/Icons';

type TitleLevel = 2 | 3 | 4 | 5 | 6;

const PostPreview = ({
  post,
  titleLevel,
}: {
  post: ArticlePreview;
  titleLevel: TitleLevel;
}) => {
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;

  const meta: ArticleMeta = {
    commentCount: post.commentCount ? post.commentCount : 0,
    dates: post.dates,
    thematics: post.thematics,
  };

  return (
    <article className={styles.wrapper}>
      {post.featuredImage && Object.keys(post.featuredImage).length > 0 && (
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
        dangerouslySetInnerHTML={{ __html: post.intro }}
      ></div>
      <footer className={styles.footer}>
        <ButtonLink
          target={`/article/${post.slug}`}
          position="left"
          hasIcon={true}
        >
          {t`Read more`}
          <span className="screen-reader-text">
            {' '}
            {t({ message: `about ${post.title}`, comment: 'Post title' })}
          </span>
          <ArrowIcon />
        </ButtonLink>
      </footer>
      <PostMeta meta={meta} />
    </article>
  );
};

export default PostPreview;
