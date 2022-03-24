import Comment from '@components/Comment/Comment';
import Spinner from '@components/Spinner/Spinner';
import { getCommentsByPostId } from '@services/graphql/queries';
import { Comment as CommentData } from '@ts/types/comments';
import { useIntl } from 'react-intl';
import useSWR from 'swr';
import styles from './CommentsList.module.scss';

const CommentsList = ({
  articleId,
  comments,
}: {
  articleId: number;
  comments: CommentData[];
}) => {
  const intl = useIntl();
  const { data, error } = useSWR<CommentData[]>(
    '/api/comments',
    () => getCommentsByPostId(articleId),
    { fallbackData: comments }
  );

  const getCommentsList = () => {
    if (error) {
      return intl.formatMessage({
        defaultMessage: 'Failed to load.',
        description: 'CommentsList: failed to load',
        id: 'Zlkww3',
      });
    }

    if (!data) return <Spinner />;

    return data.map((comment) => {
      return (
        <Comment
          key={comment.databaseId}
          articleId={articleId}
          comment={comment}
        />
      );
    });
  };

  return (
    <>
      <h2 className={styles.title}>
        {intl.formatMessage({
          defaultMessage: 'Comments',
          description: 'CommentsList: Comments section title',
          id: 'Ns8CFb',
        })}
      </h2>
      {data && data.length > 0 ? (
        <ol className={styles.list}>{getCommentsList()}</ol>
      ) : (
        <p className={styles['no-comments']}>
          {intl.formatMessage({
            defaultMessage: 'No comments yet.',
            description: 'CommentsList: No comment message',
            id: 'e9L59q',
          })}
        </p>
      )}
    </>
  );
};

export default CommentsList;
