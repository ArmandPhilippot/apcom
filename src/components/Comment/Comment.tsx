import { Button } from '@components/Buttons';
import { t } from '@lingui/macro';
import { Comment as CommentData } from '@ts/types/comments';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Comment.module.scss';

const Comment = ({ comment }: { comment: CommentData }) => {
  const router = useRouter();

  const getCommentAuthor = () => {
    return comment.author.url ? (
      <Link href={comment.author.url}>
        <a>{comment.author.name}</a>
      </Link>
    ) : (
      <span>{comment.author.name}</span>
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
        <article className={styles.wrapper}>
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
            <dd>{getLocaleDate()}</dd>
          </dl>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: comment.content }}
          ></div>
          <footer className={styles.footer}>
            <Button clickHandler={() => ''}>{t`Reply`}</Button>
          </footer>
        </article>
        {comment.replies.length > 0 && (
          <ol className={styles.list}>
            {comment.replies.map((reply) => {
              return <Comment key={reply.id} comment={reply} />;
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
