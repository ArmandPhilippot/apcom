import { Button } from '@components/Buttons';
import { t } from '@lingui/macro';
import { Comment as CommentData } from '@ts/types/comments';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Comment.module.scss';

const Comment = ({
  comment,
  isNested = false,
}: {
  comment: CommentData;
  isNested?: boolean;
}) => {
  const router = useRouter();

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
    const commentDate = new Date(comment.date);
    const date = commentDate.toLocaleDateString(router.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const time = commentDate
      .toLocaleTimeString(router.locale, {
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
              <Link href={`#comment-${comment.commentId}`}>
                <a>{getLocaleDate()}</a>
              </Link>
            </dd>
          </dl>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>
          {!isNested && (
            <footer className={styles.footer}>
              <Button clickHandler={() => ''}>{t`Reply`}</Button>
            </footer>
          )}
        </article>
        {comment.replies.length > 0 && (
          <ol className={styles.list}>
            {comment.replies.map((reply) => {
              return <Comment key={reply.id} comment={reply} isNested={true} />;
            })}
          </ol>
        )}
      </>
    );
  };

  const getCommentStatus = () => {
    return <p>{t`This comment is awaiting moderation.`}</p>;
  };

  return (
    <li className={styles.item}>
      {comment.approved ? getApprovedComment() : getCommentStatus()}
    </li>
  );
};

export default Comment;
