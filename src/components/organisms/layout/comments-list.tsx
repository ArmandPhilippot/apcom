import SingleComment, {
  type CommentProps,
} from '@components/organisms/layout/comment';
import { FC } from 'react';
import styles from './comments-list.module.scss';

export type Comment = Omit<CommentProps, 'canReply' | 'saveComment'> & {
  child?: Comment[];
};

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

    return commentsList.map(({ child, ...comment }) => (
      <li key={comment.id} className={styles.item}>
        <SingleComment
          canReply={!isLastLevel}
          Notice={Notice}
          saveComment={saveComment}
          {...comment}
        />
        {child && !isLastLevel && (
          <ol className={styles.list}>{getItems(child, startLevel + 1)}</ol>
        )}
      </li>
    ));
  };

  return <ol className={styles.list}>{getItems(comments, 0)}</ol>;
};

export default CommentsList;
