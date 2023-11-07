import {
  type ForwardRefRenderFunction,
  type ReactElement,
  type ReactNode,
  forwardRef,
} from 'react';
import { useIntl } from 'react-intl';
import type { HeadingProps } from '../../../atoms';
import { Card, CardBody, type CardProps } from '../../../molecules';
import { CommentForm, type CommentFormProps } from '../../forms';
import styles from './reply-comment-form.module.scss';

export type ReplyCommentFormProps = Omit<
  CardProps<undefined>,
  | 'children'
  | 'content'
  | 'cover'
  | 'id'
  | 'isCentered'
  | 'linkTo'
  | 'meta'
  | 'onSubmit'
  | 'variant'
> &
  Pick<CommentFormProps, 'onSubmit'> & {
    /**
     * Add additional contents below the form.
     */
    children?: ReactNode;
    /**
     * The comment id related to the reply.
     */
    commentId: number;
    /**
     * The form heading.
     */
    heading: ReactElement<HeadingProps>;
  };

const ReplyCommentFormWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  ReplyCommentFormProps
> = (
  { children, className = '', commentId, heading, onSubmit, ...props },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const intl = useIntl();
  const formLabel = intl.formatMessage(
    {
      defaultMessage: 'Leave a reply to comment {id}',
      description: 'ReplyCommentForm: an accessible name for the reply form',
      id: 'ndAawq',
    },
    { id: commentId }
  );

  return (
    <Card {...props} className={wrapperClass} ref={ref} variant={2}>
      <CardBody className={styles.body}>
        {heading}
        <CommentForm
          aria-label={formLabel}
          className={styles.form}
          onSubmit={onSubmit}
          parentId={commentId}
        />
        {children}
      </CardBody>
    </Card>
  );
};

export const ReplyCommentForm = forwardRef(ReplyCommentFormWithRef);
