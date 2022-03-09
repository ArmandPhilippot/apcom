import { Button } from '@components/Buttons';
import Spinner from '@components/Spinner/Spinner';
import { Comment as CommentData } from '@ts/types/comments';
import { settings } from '@utils/config';
import { getFormattedDate } from '@utils/helpers/format';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Comment as CommentSchema, WithContext } from 'schema-dts';
import styles from './Comment.module.scss';

const DynamicCommentForm = dynamic(
  () => import('@components/CommentForm/CommentForm'),
  {
    loading: () => <Spinner />,
  }
);

const Comment = ({
  articleId,
  comment,
  isNested = false,
}: {
  articleId: number;
  comment: CommentData;
  isNested?: boolean;
}) => {
  const intl = useIntl();
  const router = useRouter();
  const locale = router.locale ? router.locale : settings.locales.defaultLocale;
  const [shouldOpenForm, setShouldOpenForm] = useState<boolean>(false);

  const getCommentAuthor = () => {
    return comment.author.url ? (
      <Link href={comment.author.url}>
        <a className={styles.author}>{comment.author.name}</a>
      </Link>
    ) : (
      <span className={styles.author}>{comment.author.name}</span>
    );
  };

  const getLocaleDate = () => {
    const date = getFormattedDate(comment.date, locale);
    const time = new Date(comment.date)
      .toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
      })
      .replace(':', 'h');
    return intl.formatMessage(
      {
        defaultMessage: '{date} at {time}',
        description: 'Comment: publication date',
      },
      {
        date,
        time,
      }
    );
  };

  const getApprovedComment = () => {
    return (
      <>
        <article
          className={styles.wrapper}
          id={`comment-${comment.databaseId}`}
        >
          <header className={styles.header}>
            {comment.author.gravatarUrl && (
              <div className={styles.avatar}>
                <Image
                  src={comment.author.gravatarUrl}
                  alt={comment.author.name}
                  layout="fill"
                />
              </div>
            )}
            {getCommentAuthor()}
          </header>
          <dl className={styles.date}>
            <dt>
              {intl.formatMessage({
                defaultMessage: 'Published on:',
                description: 'Comment: publication date label',
              })}
            </dt>
            <dd>
              <time dateTime={comment.date}>
                <Link href={`#comment-${comment.databaseId}`}>
                  <a>{getLocaleDate()}</a>
                </Link>
              </time>
            </dd>
          </dl>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>
          {!isNested && (
            <footer className={styles.footer}>
              <Button clickHandler={() => setShouldOpenForm((prev) => !prev)}>
                {shouldOpenForm
                  ? intl.formatMessage({
                      defaultMessage: 'Cancel reply',
                      description: 'Comment: reply button',
                    })
                  : intl.formatMessage({
                      defaultMessage: 'Reply',
                      description: 'Comment: reply button',
                    })}
              </Button>
            </footer>
          )}
        </article>
        {shouldOpenForm && (
          <DynamicCommentForm
            articleId={articleId}
            parentId={comment.databaseId}
          />
        )}
        {comment.replies.length > 0 && (
          <ol className={styles.list}>
            {comment.replies.map((reply) => {
              return (
                <Comment
                  articleId={articleId}
                  key={reply.databaseId}
                  comment={reply}
                  isNested={true}
                />
              );
            })}
          </ol>
        )}
      </>
    );
  };

  const getCommentStatus = () => {
    return (
      <p>
        {intl.formatMessage({
          defaultMessage: 'This comment is awaiting moderation.',
          description: 'Comment: awaiting moderation message',
        })}
      </p>
    );
  };

  const schemaJsonLd: WithContext<CommentSchema> = {
    '@context': 'https://schema.org',
    '@id': `${settings.url}/#comment-${comment.databaseId}`,
    '@type': 'Comment',
    parentItem: isNested
      ? { '@id': `${settings.url}/#comment-${comment.parentDatabaseId}` }
      : undefined,
    about: { '@type': 'Article', '@id': `${settings.url}/#article` },
    author: {
      '@type': 'Person',
      name: comment.author.name,
      image: comment.author.gravatarUrl,
      url: comment.author.url,
    },
    creator: {
      '@type': 'Person',
      name: comment.author.name,
      image: comment.author.gravatarUrl,
      url: comment.author.url,
    },
    dateCreated: comment.date,
    datePublished: comment.date,
    text: comment.content,
  };

  return (
    <>
      <Script
        id="schema-comments"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <li className={styles.item}>
        {comment.approved ? getApprovedComment() : getCommentStatus()}
      </li>
    </>
  );
};

export default Comment;
