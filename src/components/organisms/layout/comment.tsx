import Button from '@components/atoms/buttons/button';
import Link from '@components/atoms/links/link';
import Meta from '@components/molecules/layout/meta';
import useSettings from '@utils/hooks/use-settings';
import Image from 'next/image';
import Script from 'next/script';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { type Comment as CommentSchema, type WithContext } from 'schema-dts';
import CommentForm, { type CommentFormProps } from '../forms/comment-form';
import styles from './comment.module.scss';

export type CommentAuthor = {
  /**
   * The author avatar.
   */
  avatar: string;
  /**
   * The author name.
   */
  name: string;
  /**
   * The author website.
   */
  url?: string;
};

export type CommentProps = {
  /**
   * The comment author data.
   */
  author: CommentAuthor;
  /**
   * Enable or disable the reply button. Default: true.
   */
  canReply?: boolean;
  /**
   * The comment body.
   */
  content: string;
  /**
   * The comment id.
   */
  id: number | string;
  /**
   * The comment parent id.
   */
  parentId?: number | string;
  /**
   * The comment date and time separated with a space.
   */
  publication: string;
  /**
   * A callback function to save comment form data.
   */
  saveComment: CommentFormProps['saveComment'];
};

/**
 * Comment component
 *
 * Render a single comment.
 */
const Comment: FC<CommentProps> = ({
  author,
  canReply = true,
  content,
  id,
  parentId,
  publication,
  saveComment,
  ...props
}) => {
  const intl = useIntl();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [publicationDate, publicationTime] = publication.split(' ');

  const avatarAltText = intl.formatMessage(
    {
      defaultMessage: '{author} avatar',
      description: 'Comment: avatar alternative text',
      id: 'T/hUiO',
    },
    { author: author.name }
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

  const { website } = useSettings();

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
      image: author.avatar,
      url: author.url,
    },
    creator: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar,
      url: author.url,
    },
    dateCreated: publication,
    datePublished: publication,
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
          <div className={styles.avatar}>
            <Image
              src={author.avatar}
              alt={avatarAltText}
              layout="fill"
              objectFit="cover"
              {...props}
            />
          </div>
          {author.url ? (
            <Link href={author.url} className={styles.author}>
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
        <div className={styles.body}>{content}</div>
        <footer className={styles.footer}>
          {canReply && (
            <Button kind="tertiary" onClick={() => setIsReplying(!isReplying)}>
              {buttonLabel}
            </Button>
          )}
        </footer>
      </article>
      {isReplying && (
        <CommentForm
          saveComment={saveComment}
          title={formTitle}
          className={`${styles.wrapper} ${styles['wrapper--form']}`}
        />
      )}
    </>
  );
};

export default Comment;
