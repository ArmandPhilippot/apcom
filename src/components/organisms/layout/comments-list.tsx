import SingleComment, {
  type CommentProps,
} from '@components/organisms/layout/comment';
import { Comment } from '@ts/types/app';
import { FC } from 'react';
import styles from './comments-list.module.scss';

export type CommentsListProps = Pick<CommentProps, 'Notice' | 'saveComment'> & {
  /**
   * An array of comments.
   */
  comments: Comment[];
  /**
   * The maximum depth. Use `0` to not display nested comments.
   */
  depth: 0 | 1 | 2 | 3 | 4;
};

/**
 * CommentsList component
 *
 * Render a comments list.
 */
const CommentsList: FC<CommentsListProps> = ({
  comments,
  depth,
  Notice,
  saveComment,
}) => {
  /**
   * Get each comment wrapped in a list item.
   *
   * @param {Comment[]} commentsList - An array of comments.
   * @returns {JSX.Element[]} The list items.
   */
  const getItems = (
    commentsList: Comment[],
    startLevel: number
  ): JSX.Element[] => {
    const isLastLevel = startLevel === depth;

    return commentsList.map(({ replies, ...comment }) => (
      <li key={comment.id} className={styles.item}>
        <SingleComment
          canReply={!isLastLevel}
          Notice={Notice}
          saveComment={saveComment}
          {...comment}
        />
        {replies && !isLastLevel && (
          <ol className={styles.list}>{getItems(replies, startLevel + 1)}</ol>
        )}
      </li>
    ));
  };

  return <ol className={styles.list}>{getItems(comments, 0)}</ol>;
};

export default CommentsList;
