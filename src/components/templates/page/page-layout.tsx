import Heading from '@components/atoms/headings/heading';
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
import CommentForm from '@components/organisms/forms/comment-form';
import CommentsList, {
  type CommentsListProps,
} from '@components/organisms/layout/comments-list';
import TableOfContents from '@components/organisms/widgets/table-of-contents';
import useIsMounted from '@utils/hooks/use-is-mounted';
import { FC, ReactNode, useRef } from 'react';
import { useIntl } from 'react-intl';
import Layout, { LayoutProps } from '../layout/layout';
import styles from './page-layout.module.scss';

export type PageLayoutProps = {
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
   * The page introduction.
   */
  intro?: PageHeaderProps['intro'];
  /**
   * True if it is homepage. Default: false.
   */
  isHome?: LayoutProps['isHome'];
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
  comments,
  footerMeta,
  headerMeta,
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

  const saveComment = () => {
    return null;
  };

  return (
    <Layout
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
        <Sidebar className={`${styles.sidebar} ${styles['sidebar--first']}`}>
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
      <Sidebar className={`${styles.sidebar} ${styles['sidebar--last']}`}>
        {widgets}
      </Sidebar>
      {hasCommentsSection && (
        <div className={styles.comments}>
          {hasComments && (
            <section className={styles.comments__section}>
              <Heading level={2}>{commentsTitle}</Heading>
              <CommentsList
                saveComment={saveComment}
                comments={comments}
                depth={2}
              />
            </section>
          )}
          {allowComments && (
            <section className={styles.comments__section}>
              <CommentForm saveComment={saveComment} title={commentFormTitle} />
            </section>
          )}
        </div>
      )}
    </Layout>
  );
};

export default PageLayout;
