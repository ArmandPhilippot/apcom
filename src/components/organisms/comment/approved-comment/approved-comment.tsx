import NextImage from 'next/image';
import { type ForwardRefRenderFunction, forwardRef, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { COMMENT_ID_PREFIX } from '../../../../utils/constants';
import { Button, Link, Time } from '../../../atoms';
import {
  Card,
  CardBody,
  CardCover,
  CardHeader,
  CardMeta,
  type CardProps,
  CardTitle,
  CardFooter,
  CardActions,
  MetaItem,
} from '../../../molecules';
import styles from './approved-comment.module.scss';

export type CommentAuthorAvatar = {
  /**
   * The alternative text for the avatar.
   */
  alt: string;
  /**
   * The avatar url.
   */
  src: string;
};

export type CommentAuthor = {
  /**
   * The author avatar.
   */
  avatar?: CommentAuthorAvatar;
  /**
   * The author name.
   */
  name: string;
  /**
   * The author website.
   */
  website?: string;
};

export type CommentReplyHandler = (id: number) => void | Promise<void>;

export type ApprovedCommentProps = Omit<
  CardProps<undefined>,
  | 'children'
  | 'content'
  | 'cover'
  | 'id'
  | 'isCentered'
  | 'linkTo'
  | 'meta'
  | 'variant'
> & {
  /**
   * The author data.
   */
  author: CommentAuthor;
  /**
   * The comment.
   */
  content: string;
  /**
   * The comment id.
   */
  id: number;
  /**
   * A callback function to handle reply.
   */
  onReply?: CommentReplyHandler;
  /**
   * The publication date of the comment.
   */
  publicationDate: string;
  /**
   * Add a reply button to the comment by providing a label.
   */
  replyBtn?: string;
};

const ApprovedCommentWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  ApprovedCommentProps
> = (
  {
    author,
    className = '',
    content,
    id,
    onReply,
    publicationDate,
    replyBtn,
    ...props
  },
  ref
) => {
  const intl = useIntl();
  const commentClass = `${className}`;
  const commentId = `${COMMENT_ID_PREFIX}${id}`;
  const commentLink = `#${commentId}`;
  const publicationDateLabel = intl.formatMessage({
    defaultMessage: 'Published on:',
    description: 'ApprovedComment: publication date label',
    id: 'NzeU3V',
  });

  const handleReply = useCallback(() => {
    if (onReply) onReply(id);
  }, [id, onReply]);

  return (
    <Card
      {...props}
      className={commentClass}
      cover={
        author.avatar ? (
          <CardCover aria-label={author.avatar.alt} hasBorders>
            <NextImage
              // eslint-disable-next-line react/jsx-no-literals
              alt=""
              height={96}
              src={author.avatar.src}
              width={96}
            />
          </CardCover>
        ) : undefined
      }
      id={commentId}
      ref={ref}
      variant={2}
    >
      <CardHeader>
        <CardTitle className={styles.author} isFake>
          {author.website ? (
            <Link href={author.website}>{author.name}</Link>
          ) : (
            author.name
          )}
        </CardTitle>
        <CardMeta>
          <MetaItem
            isInline
            label={publicationDateLabel}
            value={
              <Link href={commentLink}>
                <Time date={publicationDate} showTime />
              </Link>
            }
          />
        </CardMeta>
      </CardHeader>
      <CardBody
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {replyBtn ? (
        <CardFooter>
          <CardActions>
            <Button
              // eslint-disable-next-line react/jsx-no-literals
              kind="tertiary"
              onClick={handleReply}
            >
              {replyBtn}
            </Button>
          </CardActions>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export const ApprovedComment = forwardRef(ApprovedCommentWithRef);
