import PostMeta from '@components/PostMeta/PostMeta';
import { ArticleMeta } from '@ts/types/articles';
import { Cover } from '@ts/types/cover';
import Image from 'next/image';
import styles from './PostHeader.module.scss';

const PostHeader = ({
  cover,
  intro,
  title,
  meta,
}: {
  cover?: Cover;
  intro: string;
  meta?: ArticleMeta;
  title: string;
}) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.body}>
        <h1 className={styles.title}>
          {cover && (
            <span className={styles.cover}>
              <Image src={cover.sourceUrl} alt={cover.altText} layout="fill" />
            </span>
          )}
          {title}
        </h1>
        {meta && <PostMeta mode="single" meta={meta} />}
        <div
          className={styles.intro}
          dangerouslySetInnerHTML={{ __html: intro }}
        ></div>
      </div>
    </header>
  );
};

export default PostHeader;
