import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  type ReactNode,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import { sendComment } from '../../../services/graphql';
import type { SendCommentInput } from '../../../types';
import { Heading, Link } from '../../atoms';
import { Card, CardBody } from '../../molecules';
import {
  type CommentData,
  CommentsList,
  type CommentsListProps,
} from '../../organisms/comments-list';
import { CommentForm, type CommentFormSubmit } from '../../organisms/forms';
import styles from './page.module.scss';

const link = (chunks: ReactNode) => (
  // eslint-disable-next-line react/jsx-no-literals
  <Link href="#comment-form-section">{chunks}</Link>
);

export type PageCommentsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onSubmit'
> &
  Pick<CommentsListProps, 'depth'> & {
    /**
     * Should the comments form be removed from the page?
     *
     * @default false
     */
    areCommentsClosed?: boolean;
    /**
     * The page comments.
     */
    comments: CommentData[];
    /**
     * The database page id.
     */
    pageId: number;
  };

const PageCommentsWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  PageCommentsProps
> = (
  {
    areCommentsClosed = false,
    className = '',
    comments,
    depth,
    pageId,
    ...props
  },
  ref
) => {
  const wrapperClass = `${styles.comments} ${className}`;
  const commentsCount =
    comments.length +
    comments.reduce(
      (accumulator, currentValue) =>
        accumulator + (currentValue.replies?.length ?? 0),
      0
    );
  const intl = useIntl();
  const commentsListTitle = intl.formatMessage(
    {
      defaultMessage:
        '{commentsCount, plural, =0 {No comments} one {# comment} other {# comments}}',
      description: 'PageComments: the section title of the comments list',
      id: 'H4pKJP',
    },
    { commentsCount }
  );
  const commentFormSectionTitle = intl.formatMessage({
    defaultMessage: 'Leave a comment',
    description: 'PageComments: the section title of the comment form',
    id: 'Y7XdNp',
  });
  const commentFormTitle = intl.formatMessage({
    defaultMessage: 'Comment form',
    description: 'PageComments: an accessible name for the comment form',
    id: 'o+wCJz',
  });
  const noCommentsYet = intl.formatMessage<ReactNode>(
    {
      defaultMessage: 'No comments yet. <link>Be the first!</link>',
      id: 'w+BpPg',
      description: 'PageComments: no comments text',
    },
    {
      link,
    }
  );

  const saveComment: CommentFormSubmit = useCallback(
    async (data) => {
      const commentData: SendCommentInput = {
        author: data.author,
        authorEmail: data.email,
        authorUrl: data.website ?? '',
        clientMutationId: 'comment',
        commentOn: pageId,
        content: data.comment,
        parent: data.parentId,
      };
      const { comment, success } = await sendComment(commentData);
      const successPrefix = intl.formatMessage({
        defaultMessage: 'Thanks, your comment was successfully sent.',
        description: 'PageComments: comment form success message',
        id: 'ZcFroC',
      });
      const successMessage = comment?.approved
        ? intl.formatMessage({
            defaultMessage: 'It has been approved.',
            id: 'UgJwSU',
            description: 'PageComments: comment approved.',
          })
        : intl.formatMessage({
            defaultMessage: 'It is now awaiting moderation.',
            id: '/EfcyW',
            description: 'PageComments: comment awaiting moderation',
          });

      return {
        messages: {
          success: `${successPrefix} ${successMessage}`,
        },
        validator: () => success,
      };
    },
    [intl, pageId]
  );

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      <section className={styles.section}>
        <Heading className={styles.heading} level={2}>
          {commentsListTitle}
        </Heading>
        {comments.length ? (
          <CommentsList
            areRepliesForbidden={areCommentsClosed}
            comments={comments}
            depth={depth}
            onSubmit={saveComment}
          />
        ) : (
          <Card variant={2}>
            <CardBody>{noCommentsYet}</CardBody>
          </Card>
        )}
      </section>
      {areCommentsClosed ? null : (
        <section
          className={styles.section}
          // eslint-disable-next-line react/jsx-no-literals
          id="comment-form-section"
        >
          <Heading className={styles.heading} level={2}>
            {commentFormSectionTitle}
          </Heading>
          <CommentForm
            aria-label={commentFormTitle}
            className={styles.form}
            onSubmit={saveComment}
          />
        </section>
      )}
    </div>
  );
};

export const PageComments = forwardRef(PageCommentsWithRef);
