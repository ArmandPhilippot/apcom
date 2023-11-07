import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { Card, CardBody, type CardProps } from '../../../molecules';

export type PendingCommentProps = Omit<
  CardProps<undefined>,
  | 'children'
  | 'content'
  | 'cover'
  | 'id'
  | 'isCentered'
  | 'linkTo'
  | 'meta'
  | 'variant'
>;

const PendingCommentWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  PendingCommentProps
> = (props, ref) => {
  const intl = useIntl();

  return (
    <Card {...props} ref={ref} variant={2}>
      <CardBody>
        {intl.formatMessage({
          defaultMessage: 'This comment is awaiting moderation…',
          description: 'PendingComment: awaiting moderation text',
          id: '1d/xvG',
        })}
      </CardBody>
    </Card>
  );
};

export const PendingComment = forwardRef(PendingCommentWithRef);
