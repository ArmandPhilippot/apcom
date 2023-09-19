import Image from 'next/image';
import Script from 'next/script';
import { FC, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { type Comment as CommentSchema, type WithContext } from 'schema-dts';
import { type SingleComment } from '../../../types/app';
import useSettings from '../../../utils/hooks/use-settings';
import Button from '../../atoms/buttons/button';
import Link from '../../atoms/links/link';
import Meta from '../../molecules/layout/meta';
import CommentForm, { type CommentFormProps } from '../forms/comment-form';
import styles from './comment.module.scss';

export type CommentProps = Pick<
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
 * Comment component
 *
 * Render a single comment.
 */
const Comment: FC<CommentProps> = ({
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

  return (
    <>
      <Script
        id="schema-comments"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commentSchema) }}
      />
      <article
        id={`comment-${id}`}
        className={`${styles.wrapper} ${styles['wrapper--comment']}`}
      >
        <header className={styles.header}>
          {author.avatar && (
            <div className={styles.avatar}>
              <Image
                {...props}
                alt={author.avatar.alt}
                fill
                src={author.avatar.src}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {author.website ? (
            <Link href={author.website} className={styles.author}>
              {author.name}
            </Link>
          ) : (
            <span className={styles.author}>{author.name}</span>
          )}
        </header>
        <Meta
          data={{
            publication: {
              date: publicationDate,
              time: publicationTime,
              target: `#comment-${id}`,
            },
          }}
          layout="inline"
          itemsLayout="inline"
          className={styles.date}
          groupClassName={styles.date__item}
        />
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <footer className={styles.footer}>
          {canReply && (
            <Button kind="tertiary" onClick={handleReply}>
              {buttonLabel}
            </Button>
          )}
        </footer>
      </article>
      {isReplying && (
        <CommentForm
          Notice={Notice}
          parentId={id}
          saveComment={saveComment}
          title={formTitle}
          className={`${styles.wrapper} ${styles['wrapper--form']}`}
        />
      )}
    </>
  );
};

export default Comment;
