import ButtonLink from '@components/atoms/buttons/button-link';
import Heading, { type HeadingLevel } from '@components/atoms/headings/heading';
import Arrow from '@components/atoms/icons/arrow';
import Link from '@components/atoms/links/link';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import Meta, { type MetaItem } from '@components/molecules/layout/meta';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './summary.module.scss';

export type Cover = {
  alt: string;
  height: number;
  url: string;
  width: number;
};

export type RequiredMetaKey = 'publication';

export type RequiredMeta = {
  [key in RequiredMetaKey]: MetaItem;
};

export type OptionalMetaKey =
  | 'author'
  | 'categories'
  | 'comments'
  | 'readingTime'
  | 'update';

export type OptionalMeta = {
  [key in OptionalMetaKey]?: MetaItem;
};

export type Meta = RequiredMeta & OptionalMeta;

export type SummaryProps = {
  cover?: Cover;
  excerpt: string;
  meta: Meta;
  title: string;
  titleLevel?: HeadingLevel;
  url: string;
};

/**
 * Summary component
 *
 * Render a page summary.
 */
const Summary: VFC<SummaryProps> = ({
  cover,
  excerpt,
  meta,
  title,
  titleLevel = 2,
  url,
}) => {
  const intl = useIntl();

  return (
    <article className={styles.wrapper}>
      {cover && (
        <ResponsiveImage
          alt={cover.alt}
          src={cover.url}
          width={cover.width}
          height={cover.height}
          className={styles.cover}
        />
      )}
      <header className={styles.header}>
        <Link href={url}>
          <Heading level={titleLevel} className={styles.title}>
            {title}
          </Heading>
        </Link>
      </header>
      <div className={styles.body}>
        {excerpt}
        <ButtonLink target={url} className={styles['read-more']}>
          {intl.formatMessage(
            {
              defaultMessage: 'Read more<a11y> about {title}</a11y>',
              description: 'Summary: read more link',
              id: 'Zpgv+f',
            },
            {
              title,
              a11y: (chunks: string) => (
                <span className="screen-reader-text">{chunks}</span>
              ),
            }
          )}
          <Arrow direction="right" />
        </ButtonLink>
      </div>
      <footer className={styles.footer}>
        <Meta data={meta} layout="column" className={styles.meta} />
      </footer>
    </article>
  );
};

export default Summary;
