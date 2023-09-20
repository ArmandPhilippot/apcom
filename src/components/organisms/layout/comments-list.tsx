import { FC } from 'react';
import { type SingleComment } from '../../../types';
import { Comment, type CommentProps } from './comment';
import styles from './comments-list.module.scss';

export type CommentsListProps = Pick<CommentProps, 'Notice' | 'saveComment'> & {
  /**
   * An array of comments.
   */
  comments: SingleComment[];
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
export const CommentsList: FC<CommentsListProps> = ({
  comments,
  depth,
  Notice,
  saveComment,
}) => {
  /**
   * Get each comment wrapped in a list item.
   *
   * @param {SingleComment[]} commentsList - An array of comments.
   * @returns {JSX.Element[]} The list items.
   */
  const getItems = (
    commentsList: SingleComment[],
    startLevel: number
  ): JSX.Element[] => {
    const isLastLevel = startLevel === depth;

    return commentsList.map(({ replies, ...comment }) => (
      <li key={comment.id} className={styles.item}>
        <Comment
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
