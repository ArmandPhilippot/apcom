import { useState, type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import type { SingleComment } from '../../../types';
import { Heading, List, ListItem } from '../../atoms';
import {
  ApprovedComment,
  type CommentReplyHandler,
  PendingComment,
  ReplyCommentForm,
  type ReplyCommentFormProps,
} from '../comment';
import styles from './comments-list.module.scss';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type CommentsListDepth = 0 | 1 | 2 | 3 | 4;

export type CommentsListProps = Pick<ReplyCommentFormProps, 'onSubmit'> & {
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
  onSubmit,
}) => {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const intl = useIntl();
  const replyFormHeading = intl.formatMessage({
    defaultMessage: 'Leave a reply',
    description: 'CommentsList: comment form title',
    id: 'w8uLLF',
  });

  const handleReplyFormVisibility: CommentReplyHandler = useCallback((id) => {
    setReplyingTo((prevId) => {
      if (prevId === id) return null;
      return id;
    });
  }, []);

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

    return commentsList.map(
      ({ approved, meta, replies, parentId, ...comment }) => {
        const replyBtnLabel =
          replyingTo === comment.id
            ? intl.formatMessage({
                defaultMessage: 'Cancel reply',
                description: 'CommentsList: cancel reply button',
                id: 'uZj4QI',
              })
            : intl.formatMessage({
                defaultMessage: 'Reply',
                description: 'CommentsList: reply button',
                id: 'Qa9twM',
              });

        return (
          <ListItem key={comment.id}>
            {approved ? (
              <>
                <ApprovedComment
                  {...comment}
                  author={meta.author}
                  onReply={handleReplyFormVisibility}
                  publicationDate={meta.date}
                  replyBtn={replyBtnLabel}
                />
                {replyingTo === comment.id ? (
                  <ReplyCommentForm
                    className={styles.reply}
                    heading={<Heading level={2}>{replyFormHeading}</Heading>}
                    onSubmit={onSubmit}
                    commentId={comment.id}
                  />
                ) : null}
              </>
            ) : (
              <PendingComment />
            )}
            {replies.length && !isLastLevel ? (
              <List hideMarker isOrdered spacing="sm">
                {getItems(replies, startLevel + 1)}
              </List>
            ) : null}
          </ListItem>
        );
      }
    );
  };

  return (
    <List hideMarker isOrdered spacing="sm">
      {getItems(comments, 0)}
    </List>
  );
};
