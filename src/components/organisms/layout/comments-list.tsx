import type { FC } from 'react';
import type { SingleComment } from '../../../types';
import { List, ListItem } from '../../atoms';
import { UserComment, type UserCommentProps } from './comment';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type CommentsListDepth = 0 | 1 | 2 | 3 | 4;

export type CommentsListProps = Pick<
  UserCommentProps,
  'Notice' | 'saveComment'
> & {
  /**
   * An array of comments.
   */
  comments: SingleComment[];
  /**
   * The maximum depth. Use `0` to not display nested comments.
   */
  depth: CommentsListDepth;
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
      <ListItem key={comment.id}>
        <UserComment
          canReply={!isLastLevel}
          Notice={Notice}
          saveComment={saveComment}
          {...comment}
        />
        {replies.length && !isLastLevel ? (
          <List hideMarker isOrdered spacing="sm">
            {getItems(replies, startLevel + 1)}
          </List>
        ) : null}
      </ListItem>
    ));
  };

  return (
    <List hideMarker isOrdered spacing="sm">
      {getItems(comments, 0)}
    </List>
  );
};
