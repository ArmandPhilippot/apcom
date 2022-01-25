import { Button } from '@components/Buttons';
import CommentForm from '@components/CommentForm/CommentForm';
import { config } from '@config/website';
import { t } from '@lingui/macro';
import { Comment as CommentData } from '@ts/types/comments';
import { getFormattedDate } from '@utils/helpers/format';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Comment as CommentSchema, WithContext } from 'schema-dts';
import styles from './Comment.module.scss';

const Comment = ({
  articleId,
  comment,
  isNested = false,
}: {
  articleId: number;
  comment: CommentData;
  isNested?: boolean;
}) => {
  const router = useRouter();
  const locale = router.locale ? router.locale : config.locales.defaultLocale;
  const [isReply, setIsReply] = useState<boolean>(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current && firstFieldRef.current.focus();
  });

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
    return t`${date} at ${time}`;
  };

  const getApprovedComment = () => {
    return (
      <>
        <article className={styles.wrapper} id={`comment-${comment.commentId}`}>
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
            <dt>{t`Published on:`}</dt>
            <dd>
              <time dateTime={comment.date}>
                <Link href={`#comment-${comment.commentId}`}>
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
              <Button
                clickHandler={() => setIsReply((prev) => !prev)}
              >{t`Reply`}</Button>
            </footer>
          )}
        </article>
        {isReply && (
          <CommentForm
            ref={firstFieldRef}
            articleId={articleId}
            parentId={comment.commentId}
            isReply={isReply}
          />
        )}
        {comment.replies.length > 0 && (
          <ol className={styles.list}>
            {comment.replies.map((reply) => {
              return (
                <Comment
                  articleId={articleId}
                  key={reply.id}
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
    return <p>{t`This comment is awaiting moderation.`}</p>;
  };

  const schemaJsonLd: WithContext<CommentSchema> = {
    '@context': 'https://schema.org',
    '@id': `${config.url}/#comment-${comment.commentId}`,
    '@type': 'Comment',
    parentItem: isNested
      ? { '@id': `${config.url}/#comment-${comment.parentDatabaseId}` }
      : undefined,
    about: { '@type': 'Article', '@id': `${config.url}/#article` },
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      <li className={styles.item}>
        {comment.approved ? getApprovedComment() : getCommentStatus()}
      </li>
    </>
  );
};

export default Comment;
