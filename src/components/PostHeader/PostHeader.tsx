import PostMeta from '@components/PostMeta/PostMeta';
import { ArticleMeta } from '@ts/types/articles';
import { Cover } from '@ts/types/cover';
import Image from 'next/image';
import React, { ReactElement } from 'react';
import styles from './PostHeader.module.scss';

const PostHeader = ({
  cover,
  intro,
  title,
  meta,
}: {
  cover?: Cover;
  intro?: string | ReactElement;
  meta?: ArticleMeta;
  title: string;
}) => {
  const hasMeta = () => {
    return (
      meta?.author ||
      meta?.commentCount ||
      meta?.dates ||
      meta?.results ||
      meta?.thematics ||
      meta?.website
    );
  };

  const getIntro = () => {
    if (React.isValidElement(intro)) {
      const Intro = () => intro;
      return (
        <div className={styles.intro}>
          <Intro />
        </div>
      );
    }
    return (
      intro && (
        <div
          className={styles.intro}
          dangerouslySetInnerHTML={{ __html: intro }}
        ></div>
      )
    );
  };

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
        {meta && hasMeta() && <PostMeta mode="single" meta={meta} />}
        {getIntro()}
      </div>
    </header>
  );
};

export default PostHeader;
