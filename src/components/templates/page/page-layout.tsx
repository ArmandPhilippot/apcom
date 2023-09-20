import Script from 'next/script';
import { FC, HTMLAttributes, ReactNode, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { BreadcrumbList } from 'schema-dts';
import { sendComment } from '../../../services/graphql';
import { SendCommentInput } from '../../../types';
import { useIsMounted } from '../../../utils/hooks';
import { Heading, Notice, type NoticeKind, Sidebar } from '../../atoms';
import {
  Breadcrumb,
  type BreadcrumbItem,
  MetaData,
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
} from '../../organisms';
import styles from './page-layout.module.scss';

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
  breadcrumb: BreadcrumbItem[];
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
  const hasComments = Array.isArray(comments) && comments.length > 0;
  const [status, setStatus] = useState<NoticeKind>('info');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const isReplyRef = useRef<boolean>(false);

  const saveComment: CommentFormProps['saveComment'] = async (data, reset) => {
    if (!id) throw new Error('Page id missing. Cannot save comment.');

    const { comment: commentBody, email, name, parentId, website } = data;
    const commentData: SendCommentInput = {
      author: name,
      authorEmail: email,
      authorUrl: website || '',
      clientMutationId: 'contact',
      commentOn: id,
      content: commentBody,
      parent: parentId,
    };
    const { comment, success } = await sendComment(commentData);

    isReplyRef.current = !!parentId;

    if (success) {
      setStatus('success');
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
      setStatusMessage(`${successPrefix} ${successMessage}`);
      reset();
    } else {
      const error = intl.formatMessage({
        defaultMessage: 'An error occurred:',
        description: 'PageLayout: comment form error message',
        id: 'fkcTGp',
      });
      setStatus('error');
      setStatusMessage(error);
    }
  };

  /**
   * Check if meta properties are defined.
   *
   * @param {MetaData} meta - The metadata.
   */
  const hasMeta = (meta: MetaData) => {
    return Object.values(meta).every((value) => value);
  };

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <Breadcrumb
        className={styles.breadcrumb}
        itemClassName={styles.breadcrumb__items}
        items={breadcrumb}
      />
      <PageHeader
        className={styles.header}
        intro={intro}
        meta={headerMeta}
        title={title}
      />
      {withToC && (
        <Sidebar
          aria-label={intl.formatMessage({
            defaultMessage: 'Table of contents sidebar',
            id: 'Q+1GbT',
            description: 'PageLayout: accessible name for ToC sidebar',
          })}
          className={`${styles.sidebar} ${styles['sidebar--first']}`}
        >
          {isMounted && bodyRef.current && (
            <TableOfContents wrapper={bodyRef.current} />
          )}
        </Sidebar>
      )}
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
      {footerMeta && hasMeta(footerMeta) && (
        <PageFooter meta={footerMeta} className={styles.footer} />
      )}
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
      {allowComments && (
        <div className={styles.comments} id="comments">
          <section className={styles.comments__section}>
            <Heading level={2} alignment="center">
              {commentsTitle}
            </Heading>
            {hasComments ? (
              <CommentsList
                comments={comments}
                depth={2}
                Notice={
                  isReplyRef.current === true && (
                    <Notice
                      className={styles.notice}
                      kind={status}
                      message={statusMessage}
                    />
                  )
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
              titleAlignment="center"
              Notice={
                isReplyRef.current === false && (
                  <Notice
                    className={styles.notice}
                    kind={status}
                    message={statusMessage}
                  />
                )
              }
            />
          </section>
        </div>
      )}
    </>
  );
};
