import { ButtonLink } from '@components/Buttons';
import { ArrowIcon } from '@components/Icons';
import PostMeta from '@components/PostMeta/PostMeta';
import { TitleLevel } from '@ts/types/app';
import { ArticleMeta, ArticlePreview } from '@ts/types/articles';
import { settings } from '@utils/config';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { BlogPosting, WithContext } from 'schema-dts';
import styles from './PostPreview.module.scss';
import Script from 'next/script';

const PostPreview = ({
  post,
  titleLevel,
}: {
  post: ArticlePreview;
  titleLevel: TitleLevel;
}) => {
  const TitleTag = `h${titleLevel}` as keyof JSX.IntrinsicElements;
  const {
    commentCount,
    dates,
    featuredImage,
    info,
    intro,
    slug,
    thematics,
    title,
    topics,
  } = post;

  const meta: ArticleMeta = {
    commentCount: commentCount ? commentCount : 0,
    dates: dates,
    readingTime: info.readingTime,
    thematics: thematics,
    topics: topics,
    wordsCount: info.wordsCount,
  };

  const publicationDate = new Date(dates.publication);
  const updateDate = new Date(dates.update);

  const schemaJsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    name: title,
    description: intro,
    articleBody: intro,
    author: { '@id': `${settings.url}/#branding` },
    commentCount: commentCount ? commentCount : 0,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${settings.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${settings.url}/#branding` },
    headline: title,
    image: featuredImage?.sourceUrl,
    inLanguage: settings.locales.defaultLocale,
    isBasedOn: `${settings.url}/article/${slug}`,
    isPartOf: { '@id': `${settings.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: featuredImage?.sourceUrl,
  };

  return (
    <>
      <Script
        id="schema-post-preview"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <article className={styles.wrapper}>
        {featuredImage && Object.keys(featuredImage).length > 0 && (
          <div className={styles.cover}>
            <Image
              src={featuredImage.sourceUrl}
              alt={featuredImage.altText}
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        <header className={styles.header}>
          <TitleTag className={styles.title}>
            <Link href={`/article/${slug}`}>
              <a>{title}</a>
            </Link>
          </TitleTag>
        </header>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: intro }}
        ></div>
        <footer className={styles.footer}>
          <ButtonLink target={`/article/${slug}`} position="left">
            <FormattedMessage
              defaultMessage="Read more<a11y> about {title}</a11y>"
              description="PostPreview: read more link"
              values={{
                title,
                a11y: (chunks: string) => (
                  <span className="screen-reader-text">{chunks}</span>
                ),
              }}
            />
            <ArrowIcon />
          </ButtonLink>
        </footer>
        <PostMeta meta={meta} />
      </article>
    </>
  );
};

export default PostPreview;
