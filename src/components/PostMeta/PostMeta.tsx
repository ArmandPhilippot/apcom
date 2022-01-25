import { plural, t } from '@lingui/macro';
import { ArticleMeta } from '@ts/types/articles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './PostMeta.module.scss';

type PostMetaMode = 'list' | 'single';

const PostMeta = ({
  meta,
  mode = 'list',
}: {
  meta: ArticleMeta;
  mode?: PostMetaMode;
}) => {
  const { author, commentCount, dates, results, thematics, topics, website } =
    meta;
  const { asPath, locale } = useRouter();
  const isThematic = () => asPath.includes('/thematique/');
  const isArticle = () => asPath.includes('/article/');

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const getTopics = () => {
    return (
      topics &&
      topics.map((topic) => {
        return (
          <dd key={topic.id} className={styles.description}>
            <Link href={`/sujet/${topic.slug}`}>
              <a>{topic.title}</a>
            </Link>
          </dd>
        );
      })
    );
  };

  const getThematics = () => {
    return (
      thematics &&
      thematics.map((thematic) => {
        return (
          <dd key={thematic.id} className={styles.description}>
            <Link href={`/thematique/${thematic.slug}`}>
              <a>{thematic.title}</a>
            </Link>
          </dd>
        );
      })
    );
  };

  const getCommentsCount = () => {
    switch (commentCount) {
      case 0:
        return t`No comments`;
      case 1:
        return t`1 comment`;
      default:
        return t`${commentCount} comments`;
    }
  };

  const wrapperClass = styles[`wrapper--${mode}`];

  return (
    <dl className={wrapperClass}>
      {author && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Written by:`}</dt>
          <dd className={styles.description}>{author.name}</dd>
        </div>
      )}
      {dates && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Published on:`}</dt>
          <dd className={styles.description}>
            {new Date(dates.publication).toLocaleDateString(
              locale,
              dateOptions
            )}
          </dd>
        </div>
      )}
      {dates && dates.publication !== dates.update && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Updated on:`}</dt>
          <dd className={styles.description}>
            {new Date(dates.update).toLocaleDateString(locale, dateOptions)}
          </dd>
        </div>
      )}
      {results && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Total: `}</dt>
          <dd className={styles.description}>
            {plural(results, {
              zero: '# articles',
              one: '# article',
              other: '# articles',
            })}
          </dd>
        </div>
      )}
      {!isThematic() && thematics && thematics.length > 0 && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {thematics.length > 1 ? t`Thematics:` : t`Thematic:`}
          </dt>
          {getThematics()}
        </div>
      )}
      {isThematic() && topics && topics.length > 0 && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {topics.length > 1 ? t`Topics:` : t`Topic:`}
          </dt>
          {getTopics()}
        </div>
      )}
      {website && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Website:`}</dt>
          <dd className={styles.description}>
            <a href={website}>{website}</a>
          </dd>
        </div>
      )}
      {commentCount !== undefined && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Comments:`}</dt>
          <dd className={styles.description}>
            {isArticle() ? (
              <a href="#comments">{getCommentsCount()}</a>
            ) : (
              getCommentsCount()
            )}
          </dd>
        </div>
      )}
    </dl>
  );
};

export default PostMeta;
