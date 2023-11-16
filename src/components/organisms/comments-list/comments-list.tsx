import {
  forwardRef,
  useCallback,
  useState,
  type ForwardRefRenderFunction,
} from 'react';
import { useIntl } from 'react-intl';
import type { Nullable } from '../../../types';
import { Heading, List, ListItem, type ListProps } from '../../atoms';
import {
  ApprovedComment,
  type ApprovedCommentProps,
  PendingComment,
  ReplyCommentForm,
  type ReplyCommentFormProps,
} from '../comment';
import styles from './comments-list.module.scss';

export type CommentData = Pick<
  ApprovedCommentProps,
  'author' | 'content' | 'id' | 'publicationDate'
> & {
  isApproved: boolean;
  replies?: CommentData[];
};

export type CommentsListProps = Omit<
  ListProps<true, false>,
  | 'children'
  | 'hideMarker'
  | 'isHierarchical'
  | 'isInline'
  | 'isOrdered'
  | 'onSubmit'
  | 'spacing'
> &
  Pick<ReplyCommentFormProps, 'onSubmit'> & {
    /**
     * Should we forbid replies on comments when depth is not exceed?
     *
     * @default false
     */
    areRepliesForbidden?: boolean;
    /**
     * The comments.
     */
    comments: CommentData[];
    /**
     * A positive integer. When depth is set to `0`, replies are not used.
     *
     * @default 0
     */
    depth?: number;
  };

const CommentsListWithRef: ForwardRefRenderFunction<
  HTMLOListElement,
  CommentsListProps
> = (
  { areRepliesForbidden = false, comments, depth = 0, onSubmit, ...props },
  ref
) => {
  const [replyingTo, setReplyingTo] = useState<Nullable<number>>(null);
  const intl = useIntl();

  const toggleReply = useCallback((id: number) => {
    setReplyingTo((prevId) => {
      if (prevId === id) return null;
      return id;
    });
  }, []);

  const getComments = useCallback(
    (data: CommentData[], currentDepth = 0) => {
      const isLastLevel = depth === currentDepth;

      return data.map(({ isApproved, replies, ...comment }) => {
        const replyFormHeading = intl.formatMessage(
          {
            defaultMessage: 'Leave a reply to {name}',
            description: 'CommentsList: comment form title',
            id: 'c1Ju/q',
          },
          { name: comment.author.name }
        );
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
            {isApproved ? (
              <>
                <ApprovedComment
                  {...comment}
                  onReply={
                    isLastLevel || areRepliesForbidden ? undefined : toggleReply
                  }
                  replyBtn={
                    isLastLevel || areRepliesForbidden
                      ? undefined
                      : replyBtnLabel
                  }
                />
                {replyingTo === comment.id ? (
                  <ReplyCommentForm
                    className={styles.reply}
                    commentId={comment.id}
                    heading={<Heading level={2}>{replyFormHeading}</Heading>}
                    onSubmit={onSubmit}
                  />
                ) : null}
                {replies?.length && !isLastLevel ? (
                  <List
                    hideMarker
                    isOrdered
                    // eslint-disable-next-line react/jsx-no-literals
                    spacing="sm"
                  >
                    {getComments(replies, currentDepth + 1)}
                  </List>
                ) : null}
              </>
            ) : (
              <PendingComment />
            )}
          </ListItem>
        );
      });
    },
    [areRepliesForbidden, depth, intl, onSubmit, replyingTo, toggleReply]
  );

  return (
    <List
      {...props}
      hideMarker
      isOrdered
      ref={ref}
      // eslint-disable-next-line react/jsx-no-literals
      spacing="sm"
    >
      {getComments(comments)}
    </List>
  );
};

/**
 * CommentsList component
 *
 * Render a list of comments.
 */
export const CommentsList = forwardRef(CommentsListWithRef);
