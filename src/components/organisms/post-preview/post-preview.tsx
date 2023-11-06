import {
  type ForwardRefRenderFunction,
  type ReactElement,
  forwardRef,
  type ReactNode,
} from 'react';
import { useIntl } from 'react-intl';
import {
  ButtonLink,
  type HeadingLevel,
  Icon,
  Link,
  VisuallyHidden,
} from '../../atoms';
import {
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps,
  CardTitle,
  CardCover,
} from '../../molecules';
import { PostPreviewMeta, type PostPreviewMetaData } from './post-preview-meta';
import styles from './post-preview.module.scss';

const a11y = (chunks: ReactNode) => <VisuallyHidden>{chunks}</VisuallyHidden>;

export type PostPreviewProps = Omit<
  CardProps<undefined>,
  'children' | 'cover' | 'linkTo' | 'meta' | 'variant'
> & {
  /**
   * The post cover.
   */
  cover?: ReactElement;
  /**
   * The post excerpt.
   */
  excerpt: string;
  /**
   * The post title.
   */
  heading: string;
  /**
   * The heading level to use on post title.
   */
  headingLvl?: HeadingLevel;
  /**
   * The post meta.
   */
  meta?: PostPreviewMetaData;
  /**
   * The post url.
   */
  url: string;
};

const PostPreviewWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  PostPreviewProps
> = (
  { className, cover, excerpt, heading, headingLvl, meta, url, ...props },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const intl = useIntl();
  const coverLabel = intl.formatMessage(
    {
      defaultMessage: '{postTitle} cover',
      description:
        'PostPreview: an accessible name for the figure wrapping the cover',
      id: 'iG5SHf',
    },
    { postTitle: heading }
  );
  const readMore = intl.formatMessage<ReactNode>(
    {
      defaultMessage: 'Read more<a11y> about {postTitle}</a11y>',
      description: 'PostPreview: read more link',
      id: 'BYdQze',
    },
    {
      postTitle: heading,
      a11y,
    }
  );

  return (
    <Card
      {...props}
      className={wrapperClass}
      cover={
        cover ? (
          <CardCover aria-label={coverLabel} hasBorders>
            {cover}
          </CardCover>
        ) : undefined
      }
      meta={meta ? <PostPreviewMeta meta={meta} /> : undefined}
      ref={ref}
    >
      <CardHeader>
        <CardTitle className={styles.heading} level={headingLvl}>
          <Link href={url}>{heading}</Link>
        </CardTitle>
      </CardHeader>
      <CardBody
        className={styles.excerpt}
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <CardFooter>
        <CardActions>
          <ButtonLink to={url}>
            {readMore}
            <Icon
              aria-hidden
              className={styles.icon}
              // eslint-disable-next-line react/jsx-no-literals
              orientation="right"
              // eslint-disable-next-line react/jsx-no-literals
              shape="arrow"
            />
          </ButtonLink>
        </CardActions>
      </CardFooter>
    </Card>
  );
};

export const PostPreview = forwardRef(PostPreviewWithRef);
