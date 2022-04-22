import Button from '@components/atoms/buttons/button';
import Link from '@components/atoms/links/link';
import DescriptionList from '@components/atoms/lists/description-list';
import { getFormattedDate, getFormattedTime } from '@utils/helpers/format';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
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
   * The comment date.
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
  publication,
  saveComment,
  ...props
}) => {
  const intl = useIntl();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentDate = getFormattedDate(publication);
  const commentTime = getFormattedTime(publication);
  const commentDateTime = new Date(publication).toISOString();

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
  const dateLabel = intl.formatMessage({
    defaultMessage: 'Published on:',
    description: 'Comment: publication date label',
    id: 'soj7do',
  });
  const dateValue = intl.formatMessage(
    {
      defaultMessage: '{date} at {time}',
      description: 'Comment: publication date and time',
      id: 'Ld6yMP',
    },
    {
      date: commentDate,
      time: commentTime,
    }
  );
  const formTitle = intl.formatMessage({
    defaultMessage: 'Leave a reply',
    description: 'Comment: comment form title',
    id: '2fD5CI',
  });

  const dateLink = (
    <Link href={`#comment-${id}`}>
      <time dateTime={commentDateTime}></time>
      {dateValue}
    </Link>
  );

  return (
    <>
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
        <DescriptionList
          items={[{ id: 'comment-date', term: dateLabel, value: [dateLink] }]}
          layout="inline"
          className={styles.date}
          groupClassName={styles.meta}
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
