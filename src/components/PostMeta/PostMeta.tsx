import { ArticleMeta } from '@ts/types/articles';
import { settings } from '@utils/config';
import { getFormattedDate } from '@utils/helpers/format';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  const router = useRouter();
  const locale = router.locale ? router.locale : settings.locales.defaultLocale;
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
    return intl.formatMessage(
      {
        defaultMessage:
          '{commentCount, plural, =0 {No comments} one {# comment} other {# comments}}',
        description: 'PostMeta: comment count value',
      },
      { commentCount }
    );
  };

  const getReadingTime = () => {
    if (!readingTime) return;
    if (readingTime < 0)
      return intl.formatMessage({
        defaultMessage: 'less than 1 minute',
        description: 'PostMeta: Reading time value',
      });
    return intl.formatMessage(
      {
        defaultMessage:
          '{readingTime, plural, =0 {# minutes} one {# minute} other {# minutes}}',
        description: 'PostMeta: reading time value',
      },
      { readingTime }
    );
  };

  const getDates = () => {
    if (!dates) return <></>;

    const publicationDate = getFormattedDate(dates.publication, locale);
    const updateDate = getFormattedDate(dates.update, locale);

    return (
      <>
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Published on:',
              description: 'PostMeta: publication date label',
            })}
          </dt>
          <dd className={styles.description}>
            <time dateTime={dates.publication}>{publicationDate}</time>
          </dd>
        </div>
        {publicationDate !== updateDate && (
          <div className={styles.item}>
            <dt className={styles.term}>
              {intl.formatMessage({
                defaultMessage: 'Updated on:',
                description: 'PostMeta: update date label',
              })}
            </dt>
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
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Written by:',
              description: 'Article meta',
            })}
          </dt>
          <dd className={styles.description}>{author.name}</dd>
        </div>
      )}
      {getDates()}
      {readingTime !== undefined && wordsCount !== undefined && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Reading time:',
              description: 'Article meta',
            })}
          </dt>
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
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Total:',
              description: 'Article meta',
            })}
          </dt>
          <dd className={styles.description}>
            {intl.formatMessage(
              {
                defaultMessage:
                  '{results, plural, =0 {No articles} one {# article} other {# articles}}',
                description: 'PostMeta: total found articles',
              },
              { results }
            )}
          </dd>
        </div>
      )}
      {!isThematic() && thematics && thematics.length > 0 && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage(
              {
                defaultMessage:
                  '{thematicsCount, plural, =0 {Thematics:} one {Thematic:} other {Thematics:}}',
                description: 'PostMeta: thematics list label',
              },
              { thematicsCount: thematics.length }
            )}
          </dt>
          {getThematics()}
        </div>
      )}
      {isThematic() && topics && topics.length > 0 && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage(
              {
                defaultMessage:
                  '{topicsCount, plural, =0 {Topics:} one {Topic:} other {Topics:}}',
                description: 'PostMeta: topics list label',
              },
              { topicsCount: topics.length }
            )}
          </dt>
          {getTopics()}
        </div>
      )}
      {website && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Website:',
              description: 'PostMeta: website label',
            })}
          </dt>
          <dd className={styles.description}>
            <a href={website}>{website}</a>
          </dd>
        </div>
      )}
      {commentCount !== undefined && (
        <div className={styles.item}>
          <dt className={styles.term}>
            {intl.formatMessage({
              defaultMessage: 'Comments:',
              description: 'PostMeta: comment count label',
            })}
          </dt>
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
