import Script from 'next/script';
import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import type { BreadcrumbList } from 'schema-dts';
import { sendComment } from '../../../services/graphql';
import type { Approved, SendCommentInput, SingleComment } from '../../../types';
import { useIsMounted } from '../../../utils/hooks';
import { Heading, Notice, type NoticeKind, Sidebar } from '../../atoms';
import {
  PageFooter,
  type PageFooterProps,
  PageHeader,
  type PageHeaderProps,
} from '../../molecules';
import {
  CommentForm,
  type CommentFormProps,
  CommentsList,
  type CommentsListProps,
  TableOfContents,
  Breadcrumbs,
  type BreadcrumbsItem,
} from '../../organisms';
import styles from './page-layout.module.scss';

/**
 * Check if there is at least one comment.
 *
 * @param {SingleComment[] | undefined} comments - The comments.
 */
const hasComments = (
  comments: SingleComment[] | undefined
): comments is SingleComment[] =>
  Array.isArray(comments) && comments.length > 0;

type CommentStatus = {
  isReply: boolean;
  kind: NoticeKind;
  message: string;
};

export type PageLayoutProps = {
  /**
   * True if the page accepts new comments. Default: false.
   */
  allowComments?: boolean;
  /**
   * Set attributes to the page body.
   */
  bodyAttributes?: HTMLAttributes<HTMLDivElement>;
  /**
   * Set additional classnames to the body wrapper.
   */
  bodyClassName?: string;
  /**
   * The breadcrumb items.
   */
  breadcrumb: BreadcrumbsItem[];
  /**
   * The breadcrumb JSON schema.
   */
  breadcrumbSchema: BreadcrumbList['itemListElement'][];
  /**
   * The main content of the page.
   */
  children: ReactNode;
  /**
   * The page comments
   */
  comments?: CommentsListProps['comments'];
  /**
   * The footer metadata.
   */
  footerMeta?: PageFooterProps['meta'];
  /**
   * The header metadata.
   */
  headerMeta?: PageHeaderProps['meta'];
  /**
   * The page id.
   */
  id?: number;
  /**
   * The page introduction.
   */
  intro?: PageHeaderProps['intro'];
  /**
   * The page title.
   */
  title: PageHeaderProps['title'];
  /**
   * An array of widgets to put in the last sidebar.
   */
  widgets?: ReactNode[];
  /**
   * Show the table of contents. Default: false.
   */
  withToC?: boolean;
};

/**
 * PageLayout component
 *
 * Render the pages layout.
 */
export const PageLayout: FC<PageLayoutProps> = ({
  children,
  allowComments = false,
  bodyAttributes,
  bodyClassName = '',
  breadcrumb,
  breadcrumbSchema,
  comments,
  footerMeta,
  headerMeta,
  id,
  intro,
  title,
  widgets,
  withToC = false,
}) => {
  const intl = useIntl();
  const breadcrumbsLabel = intl.formatMessage({
    defaultMessage: 'Breadcrumb',
    description: 'PageLayout: an accessible name for the breadcrumb nav.',
    id: 'm6a3BD',
  });
  const commentsTitle = intl.formatMessage({
    defaultMessage: 'Comments',
    description: 'PageLayout: comments title',
    id: '+dJU3e',
  });
  const commentFormTitle = intl.formatMessage({
    defaultMessage: 'Leave a comment',
    description: 'PageLayout: comment form title',
    id: 'kzIYoQ',
  });

  const bodyRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted(bodyRef);
  const [commentStatus, setCommentStatus] = useState<CommentStatus | undefined>(
    undefined
  );

  const isSuccessStatus = useCallback(
    (comment: Approved | null, isReply: boolean, isSuccess: boolean) => {
      if (isSuccess) {
        const successPrefix = intl.formatMessage({
          defaultMessage: 'Thanks, your comment was successfully sent.',
          description: 'PageLayout: comment form success message',
          id: 'B290Ph',
        });
        const successMessage = comment?.approved
          ? intl.formatMessage({
              defaultMessage: 'It has been approved.',
              id: 'g3+Ahv',
              description: 'PageLayout: comment approved.',
            })
          : intl.formatMessage({
              defaultMessage: 'It is now awaiting moderation.',
              id: 'Vmj5cw',
              description: 'PageLayout: comment awaiting moderation',
            });
        setCommentStatus({
          isReply,
          kind: 'success',
          message: `${successPrefix} ${successMessage}`,
        });
        return true;
      }

      const error = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'PageLayout: comment form error message',
        id: 'fkcTGp',
      });
      setCommentStatus({ isReply, kind: 'error', message: error });
      return false;
    },
    [intl]
  );

  const saveComment: CommentFormProps['saveComment'] = useCallback(
    async (data, reset) => {
      if (!id) throw new Error('Page id missing. Cannot save comment.');

      const { author, comment: commentBody, email, parentId, website } = data;
      const isReply = !!parentId;
      const commentData: SendCommentInput = {
        author,
        authorEmail: email,
        authorUrl: website ?? '',
        clientMutationId: 'comment',
        commentOn: id,
        content: commentBody,
        parent: parentId,
      };
      const { comment, success } = await sendComment(commentData);

      if (isSuccessStatus(comment, isReply, success)) reset();
    },
    [id, isSuccessStatus]
  );

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <Breadcrumbs
        aria-label={breadcrumbsLabel}
        className={styles.breadcrumb}
        items={breadcrumb}
      />
      <PageHeader
        className={styles.header}
        intro={intro}
        meta={headerMeta}
        title={title}
      />
      {withToC ? (
        <Sidebar
          aria-label={intl.formatMessage({
            defaultMessage: 'Table of contents sidebar',
            id: 'Q+1GbT',
            description: 'PageLayout: accessible name for ToC sidebar',
          })}
          className={`${styles.sidebar} ${styles['sidebar--first']}`}
        >
          {isMounted && bodyRef.current ? (
            <TableOfContents wrapper={bodyRef.current} />
          ) : null}
        </Sidebar>
      ) : null}
      {typeof children === 'string' ? (
        <div
          {...bodyAttributes}
          className={`${styles.body} ${bodyClassName}`}
          dangerouslySetInnerHTML={{ __html: children }}
          ref={bodyRef}
        />
      ) : (
        <div ref={bodyRef} className={`${styles.body} ${bodyClassName}`}>
          {children}
        </div>
      )}
      {footerMeta?.length ? (
        <PageFooter meta={footerMeta} className={styles.footer} />
      ) : null}
      <Sidebar
        aria-label={intl.formatMessage({
          defaultMessage: 'Sidebar',
          id: 'c556Qo',
          description: 'PageLayout: accessible name for the sidebar',
        })}
        className={`${styles.sidebar} ${styles['sidebar--last']}`}
      >
        {widgets}
      </Sidebar>
      {allowComments ? (
        <div className={styles.comments} id="comments">
          <section className={styles.comments__section}>
            <Heading className={styles.comments__title} level={2}>
              {commentsTitle}
            </Heading>
            {hasComments(comments) ? (
              <CommentsList
                comments={comments}
                depth={2}
                Notice={
                  commentStatus?.isReply ? (
                    <Notice className={styles.notice} kind={commentStatus.kind}>
                      {commentStatus.message}
                    </Notice>
                  ) : null
                }
                saveComment={saveComment}
              />
            ) : (
              <p className={styles['comments__no-comments']}>
                {intl.formatMessage({
                  defaultMessage: 'No comments.',
                  id: 'sBwfCy',
                  description: 'PageLayout: no comments text',
                })}
              </p>
            )}
          </section>
          <section className={styles.comments__section}>
            <CommentForm
              className={styles.comments__form}
              saveComment={saveComment}
              title={commentFormTitle}
              Notice={
                commentStatus && !commentStatus.isReply ? (
                  <Notice className={styles.notice} kind={commentStatus.kind}>
                    {commentStatus.message}
                  </Notice>
                ) : null
              }
            />
          </section>
        </div>
      ) : null}
    </>
  );
};
