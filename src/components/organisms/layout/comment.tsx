/* eslint-disable max-statements */
import NextImage from 'next/image';
import Script from 'next/script';
import { type FC, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import type { Comment as CommentSchema, WithContext } from 'schema-dts';
import type { SingleComment } from '../../../types';
import { getFormattedDate, getFormattedTime } from '../../../utils/helpers';
import { useSettings } from '../../../utils/hooks';
import { Button, Link } from '../../atoms';
import { MetaList } from '../../molecules';
import { CommentForm, type CommentFormProps } from '../forms';
import styles from './comment.module.scss';

export type UserCommentProps = Pick<
  SingleComment,
  'approved' | 'content' | 'id' | 'meta' | 'parentId'
> &
  Pick<CommentFormProps, 'Notice' | 'saveComment'> & {
    /**
     * Enable or disable the reply button. Default: true.
     */
    canReply?: boolean;
  };

/**
 * UserComment component
 *
 * Render a single comment.
 */
export const UserComment: FC<UserCommentProps> = ({
  approved,
  canReply = true,
  content,
  id,
  meta,
  Notice,
  parentId,
  saveComment,
  ...props
}) => {
  const intl = useIntl();
  const { website } = useSettings();
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleReply = useCallback(
    () => setIsReplying((prevState) => !prevState),
    []
  );

  if (!approved) {
    return (
      <div className={styles.wrapper}>
        {intl.formatMessage({
          defaultMessage: 'This comment is awaiting moderation...',
          description: 'Comment: awaiting moderation',
          id: '6a1Uo6',
        })}
      </div>
    );
  }

  const { author, date } = meta;
  const [publicationDate, publicationTime] = date.split(' ');
  const isoDateTime = new Date(
    `${publicationDate}T${publicationTime}`
  ).toISOString();
  const commentDate = intl.formatMessage(
    {
      defaultMessage: '{date} at {time}',
      description: 'Comment: publication date and time',
      id: 'Ld6yMP',
    },
    {
      date: getFormattedDate(publicationDate),
      time: getFormattedTime(`${publicationDate}T${publicationTime}`),
    }
  );

  const buttonLabel = isReplying
    ? intl.formatMessage({
        defaultMessage: 'Cancel reply',
        description: 'Comment: cancel reply button',
        id: 'LCorTC',
      })
    : intl.formatMessage({
        defaultMessage: 'Reply',
        description: 'Comment: reply button',
        id: 'hzHuCc',
      });
  const formTitle = intl.formatMessage({
    defaultMessage: 'Leave a reply',
    description: 'Comment: comment form title',
    id: '2fD5CI',
  });

  const commentSchema: WithContext<CommentSchema> = {
    '@context': 'https://schema.org',
    '@id': `${website.url}/#comment-${id}`,
    '@type': 'Comment',
    parentItem: parentId
      ? { '@id': `${website.url}/#comment-${parentId}` }
      : undefined,
    about: { '@type': 'Article', '@id': `${website.url}/#article` },
    author: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar?.src,
      url: author.website,
    },
    creator: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar?.src,
      url: author.website,
    },
    dateCreated: date,
    datePublished: date,
    text: content,
  };

  const commentWrapperClass = `${styles.wrapper} ${styles['wrapper--comment']}`;
  const formWrapperClass = `${styles.wrapper} ${styles['wrapper--form']}`;

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commentSchema) }}
        id="schema-comments"
        type="application/ld+json"
      />
      <article className={commentWrapperClass} id={`comment-${id}`}>
        <header className={styles.header}>
          {author.avatar ? (
            <div className={styles.avatar}>
              <NextImage
                {...props}
                alt={author.avatar.alt}
                fill
                src={author.avatar.src}
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : null}
          {author.website ? (
            <Link href={author.website} className={styles.author}>
              {author.name}
            </Link>
          ) : (
            <span className={styles.author}>{author.name}</span>
          )}
        </header>
        <MetaList
          className={styles.date}
          isInline
          items={[
            {
              id: 'publication-date',
              label: intl.formatMessage({
                defaultMessage: 'Published on:',
                description: 'Comment: publication date label',
                id: 'soj7do',
              }),
              value: (
                <Link href={`#comment-${id}`}>
                  <time dateTime={isoDateTime}>{commentDate}</time>
                </Link>
              ),
            },
          ]}
        />
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <footer className={styles.footer}>
          {canReply ? (
            <Button kind="tertiary" onClick={handleReply}>
              {buttonLabel}
            </Button>
          ) : null}
        </footer>
      </article>
      {isReplying ? (
        <CommentForm
          className={formWrapperClass}
          Notice={Notice}
          parentId={id}
          saveComment={saveComment}
          title={formTitle}
        />
      ) : null}
    </>
  );
};
