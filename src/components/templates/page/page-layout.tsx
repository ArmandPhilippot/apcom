/* eslint-disable max-statements */
import Script from 'next/script';
import {
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useRef,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import type { BreadcrumbList } from 'schema-dts';
import { sendComment } from '../../../services/graphql';
import type { SendCommentInput } from '../../../types';
import { useHeadingsTree, useIsMounted } from '../../../utils/hooks';
import { Heading, Sidebar } from '../../atoms';
import {
  PageFooter,
  type PageFooterProps,
  PageHeader,
  type PageHeaderProps,
} from '../../molecules';
import {
  CommentForm,
  CommentsList,
  type CommentsListProps,
  TocWidget,
  Breadcrumbs,
  type BreadcrumbsItem,
  type CommentFormSubmit,
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
  const commentFormSectionTitle = intl.formatMessage({
    defaultMessage: 'Leave a comment',
    description: 'PageLayout: comment form title',
    id: 'kzIYoQ',
  });
  const commentFormTitle = intl.formatMessage({
    defaultMessage: 'Comment form',
    description: 'PageLayout: comment form accessible name',
    id: 'l+Jcf6',
  });
  const tocTitle = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'PageLayout: table of contents title',
    id: 'eys2uX',
  });

  const bodyRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted(bodyRef);
  const headingsTree = useHeadingsTree(bodyRef, { fromLevel: 2 });

  const saveComment: CommentFormSubmit = useCallback(
    async (data) => {
      if (!id) throw new Error('Page id missing. Cannot save comment.');

      const { author, comment: commentBody, email, parentId, website } = data;
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

      if (success) {
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
        return {
          messages: {
            success: `${successPrefix} ${successMessage}`,
          },
          validator: () => success,
        };
      }

      return {
        messages: {
          error: intl.formatMessage({
            defaultMessage: 'An error occurred:',
            description: 'PageLayout: comment form error message',
            id: 'fkcTGp',
          }),
        },
        validator: () => success,
      };
    },
    [id, intl]
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
            <TocWidget
              heading={<Heading level={3}>{tocTitle}</Heading>}
              tree={headingsTree}
            />
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
            {comments?.length ? (
              <CommentsList
                comments={comments}
                depth={2}
                onSubmit={saveComment}
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
            <Heading className={styles.comments__title} level={2}>
              {commentFormSectionTitle}
            </Heading>
            <CommentForm
              aria-label={commentFormTitle}
              className={styles.comments__form}
              onSubmit={saveComment}
            />
          </section>
        </div>
      ) : null}
    </>
  );
};
