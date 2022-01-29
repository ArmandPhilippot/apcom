import Comment from '@components/Comment/Comment';
import { Comment as CommentData } from '@ts/types/comments';
import { useIntl } from 'react-intl';
import styles from './CommentsList.module.scss';

const CommentsList = ({
  articleId,
  comments,
}: {
  articleId: number;
  comments: CommentData[];
}) => {
  const intl = useIntl();

  const getCommentsList = () => {
    return comments.map((comment) => {
      return (
        <Comment key={comment.id} articleId={articleId} comment={comment} />
      );
    });
  };

  return (
    <>
      <h2 className={styles.title}>
        {intl.formatMessage({
          defaultMessage: 'Comments',
          description: 'CommentsList: Comments section title',
        })}
      </h2>
      {comments.length > 0 ? (
        <ol className={styles.list}>{getCommentsList()}</ol>
      ) : (
        <p className={styles['no-comments']}>
          {intl.formatMessage({
            defaultMessage: 'No comments yet.',
            description: 'CommentsList: No comment message',
          })}
        </p>
      )}
    </>
  );
};

export default CommentsList;
