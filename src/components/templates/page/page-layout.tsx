import Heading from '@components/atoms/headings/heading';
import Notice, { type NoticeKind } from '@components/atoms/layout/notice';
import Sidebar from '@components/atoms/layout/sidebar';
import PageFooter, {
  type PageFooterProps,
} from '@components/molecules/layout/page-footer';
import PageHeader, {
  type PageHeaderProps,
} from '@components/molecules/layout/page-header';
import Breadcrumb, {
  type BreadcrumbItem,
} from '@components/molecules/nav/breadcrumb';
import CommentForm, {
  type CommentFormProps,
} from '@components/organisms/forms/comment-form';
import CommentsList, {
  type CommentsListProps,
} from '@components/organisms/layout/comments-list';
import TableOfContents from '@components/organisms/widgets/table-of-contents';
import { type SendCommentVars } from '@services/graphql/api';
import { sendComment } from '@services/graphql/comments';
import useIsMounted from '@utils/hooks/use-is-mounted';
import { FC, ReactNode, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Layout, { type LayoutProps } from '../layout/layout';
import styles from './page-layout.module.scss';

export type PageLayoutProps = Pick<
  LayoutProps,
  'breadcrumbSchema' | 'isHome'
> & {
  /**
   * True if the page accepts new comments. Default: false.
   */
  allowComments?: boolean;
  /**
   * The breadcrumb items.
   */
  breadcrumb: BreadcrumbItem[];
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
const PageLayout: FC<PageLayoutProps> = ({
  children,
  allowComments = false,
  breadcrumb,
  breadcrumbSchema,
  comments,
  footerMeta,
  headerMeta,
  id,
  intro,
  isHome = false,
  widgets,
  title,
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
  const hasCommentsSection = hasComments || allowComments;
  const articleModifier = hasCommentsSection
    ? 'article--has-comments'
    : 'article--no-comments';

  const [status, setStatus] = useState<NoticeKind>('info');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const isReplyRef = useRef<boolean>(false);

  const saveComment: CommentFormProps['saveComment'] = async (data, reset) => {
    if (!id) throw new Error('Page id missing. Cannot save comment.');

    const { comment: commentBody, email, name, parentId, website } = data;
    const commentData: SendCommentVars = {
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

  return (
    <Layout
      breadcrumbSchema={breadcrumbSchema}
      isHome={isHome}
      className={`${styles.article} ${styles[articleModifier]}`}
    >
      <Breadcrumb
        items={breadcrumb}
        className={styles.breadcrumb}
        itemClassName={styles.breadcrumb__items}
      />
      <PageHeader
        title={title}
        intro={intro}
        meta={headerMeta}
        className={styles.header}
      />
      {withToC && (
        <Sidebar
          className={`${styles.sidebar} ${styles['sidebar--first']}`}
          aria-label={intl.formatMessage({
            defaultMessage: 'Table of contents sidebar',
            id: 'Q+1GbT',
            description: 'PageLayout: accessible name for ToC sidebar',
          })}
        >
          {isMounted && bodyRef.current && (
            <TableOfContents wrapper={bodyRef.current} />
          )}
        </Sidebar>
      )}
      {typeof children === 'string' ? (
        <div
          ref={bodyRef}
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: children }}
        />
      ) : (
        <div ref={bodyRef} className={styles.body}>
          {children}
        </div>
      )}
      <PageFooter meta={footerMeta} className={styles.footer} />
      <Sidebar
        className={`${styles.sidebar} ${styles['sidebar--last']}`}
        aria-label={intl.formatMessage({
          defaultMessage: 'Sidebar',
          id: 'c556Qo',
          description: 'PageLayout: accessible name for the sidebar',
        })}
      >
        {widgets}
      </Sidebar>
      {hasCommentsSection && (
        <div className={styles.comments}>
          {hasComments && (
            <section className={styles.comments__section}>
              <Heading level={2}>{commentsTitle}</Heading>
              <CommentsList
                comments={comments}
                depth={1}
                Notice={
                  isReplyRef.current === true ? (
                    <Notice
                      kind={status}
                      message={statusMessage}
                      className={styles.notice}
                    />
                  ) : undefined
                }
                saveComment={saveComment}
              />
            </section>
          )}
          {allowComments && (
            <section className={styles.comments__section}>
              <CommentForm
                saveComment={saveComment}
                title={commentFormTitle}
                Notice={
                  isReplyRef.current === false ? (
                    <Notice
                      kind={status}
                      message={statusMessage}
                      className={styles.notice}
                    />
                  ) : undefined
                }
              />
            </section>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PageLayout;
