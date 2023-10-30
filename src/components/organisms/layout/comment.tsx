/* eslint-disable max-statements */
import NextImage from 'next/image';
import Script from 'next/script';
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import type { Comment as CommentSchema, WithContext } from 'schema-dts';
import type { SingleComment } from '../../../types';
import { useSettings, useToggle } from '../../../utils/hooks';
import { Button, Link, Time } from '../../atoms';
import {
  Card,
  CardActions,
  CardBody,
  CardCover,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
} from '../../molecules';
import { CommentForm, type CommentFormProps } from '../forms';
import styles from './comment.module.scss';

export type UserCommentProps = Pick<
  SingleComment,
  'approved' | 'content' | 'id' | 'meta' | 'parentId'
> &
  Pick<CommentFormProps, 'Notice' | 'saveComment'> & {
    /**
     * Enable or disable the reply button. Default: true.
     */
    canReply?: boolean;
  };

/**
 * UserComment component
 *
 * Render a single comment.
 */
export const UserComment: FC<UserCommentProps> = ({
  approved,
  canReply = true,
  content,
  id,
  meta,
  Notice,
  parentId,
  saveComment,
  ...props
}) => {
  const intl = useIntl();
  const { website } = useSettings();
  const [isReplying, toggleIsReplying] = useToggle(false);

  if (!approved) {
    return (
      <div className={styles.wrapper}>
        {intl.formatMessage({
          defaultMessage: 'This comment is awaiting moderation...',
          description: 'Comment: awaiting moderation',
          id: '6a1Uo6',
        })}
      </div>
    );
  }

  const { author, date } = meta;

  const buttonLabel = isReplying
    ? intl.formatMessage({
        defaultMessage: 'Cancel reply',
        description: 'Comment: cancel reply button',
        id: 'LCorTC',
      })
    : intl.formatMessage({
        defaultMessage: 'Reply',
        description: 'Comment: reply button',
        id: 'hzHuCc',
      });
  const formTitle = intl.formatMessage({
    defaultMessage: 'Leave a reply',
    description: 'Comment: comment form title',
    id: '2fD5CI',
  });

  const commentSchema: WithContext<CommentSchema> = {
    '@context': 'https://schema.org',
    '@id': `${website.url}/#comment-${id}`,
    '@type': 'Comment',
    parentItem: parentId
      ? { '@id': `${website.url}/#comment-${parentId}` }
      : undefined,
    about: { '@type': 'Article', '@id': `${website.url}/#article` },
    author: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar?.src,
      url: author.website,
    },
    creator: {
      '@type': 'Person',
      name: author.name,
      image: author.avatar?.src,
      url: author.website,
    },
    dateCreated: date,
    datePublished: date,
    text: content,
  };

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(commentSchema) }}
        id="schema-comments"
        type="application/ld+json"
      />
      <Card
        cover={
          author.avatar ? (
            <CardCover className={styles.avatar}>
              <NextImage
                {...props}
                alt={author.avatar.alt}
                fill
                src={author.avatar.src}
                style={{ objectFit: 'cover' }}
              />
            </CardCover>
          ) : undefined
        }
        id={`comment-${id}`}
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
          <CardMeta
            hasInlinedItems
            items={[
              {
                id: 'publication-date',
                label: intl.formatMessage({
                  defaultMessage: 'Published on:',
                  description: 'Comment: publication date label',
                  id: 'soj7do',
                }),
                value: (
                  <Link href={`#comment-${id}`}>
                    <Time date={date} showTime />
                  </Link>
                ),
              },
            ]}
          />
        </CardHeader>
        <CardBody
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {canReply ? (
          <CardFooter>
            <CardActions>
              <Button kind="tertiary" onClick={toggleIsReplying}>
                {buttonLabel}
              </Button>
            </CardActions>
          </CardFooter>
        ) : null}
      </Card>
      {isReplying ? (
        <Card className={styles.form} variant={2}>
          <CardBody>
            <CommentForm
              Notice={Notice}
              parentId={id}
              saveComment={saveComment}
              title={formTitle}
            />
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};
