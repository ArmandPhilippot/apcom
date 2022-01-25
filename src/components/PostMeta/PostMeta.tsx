import { config } from '@config/website';
import { plural, t } from '@lingui/macro';
import { ArticleMeta } from '@ts/types/articles';
import { getFormattedDate } from '@utils/helpers/format';
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
  const {
    author,
    commentCount,
    dates,
    readingTime,
    results,
    thematics,
    topics,
    website,
    wordsCount,
  } = meta;
  const router = useRouter();
  const locale = router.locale ? router.locale : config.locales.defaultLocale;
  const isThematic = () => router.asPath.includes('/thematique/');
  const isArticle = () => router.asPath.includes('/article/');

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

  const getReadingTime = () => {
    if (!readingTime) return;
    if (readingTime < 0) return t`less than 1 minute`;
    return plural(readingTime, {
      zero: '# minutes',
      one: '# minute',
      other: '# minutes',
    });
  };

  const getDates = () => {
    if (!dates) return <></>;

    const publicationDate = getFormattedDate(dates.publication, locale);
    const updateDate = getFormattedDate(dates.update, locale);

    return (
      <>
        <div className={styles.item}>
          <dt className={styles.term}>{t`Published on:`}</dt>
          <dd className={styles.description}>
            <time dateTime={dates.publication}>{publicationDate}</time>
          </dd>
        </div>
        {publicationDate !== updateDate && (
          <div className={styles.item}>
            <dt className={styles.term}>{t`Updated on:`}</dt>
            <dd className={styles.description}>
              <time dateTime={dates.update}>{updateDate}</time>
            </dd>
          </div>
        )}
      </>
    );
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
      {getDates()}
      {readingTime !== undefined && wordsCount !== undefined && (
        <div className={styles.item}>
          <dt className={styles.term}>{t`Reading time:`}</dt>
          <dd
            className={styles.description}
            title={`Approximately ${wordsCount.toLocaleString(locale)} words`}
          >
            {getReadingTime()}
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
