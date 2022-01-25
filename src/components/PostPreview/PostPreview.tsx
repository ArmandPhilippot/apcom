import PostMeta from '@components/PostMeta/PostMeta';
import { t } from '@lingui/macro';
import { ArticleMeta, ArticlePreview } from '@ts/types/articles';
import Link from 'next/link';
import styles from './PostPreview.module.scss';
import Image from 'next/image';
import { ButtonLink } from '@components/Buttons';
import { ArrowIcon } from '@components/Icons';
import { TitleLevel } from '@ts/types/app';
import { BlogPosting, WithContext } from 'schema-dts';
import Head from 'next/head';
import { config } from '@config/website';

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
    author: { '@id': `${config.url}/#branding` },
    commentCount: commentCount ? commentCount : 0,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${config.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${config.url}/#branding` },
    image: featuredImage?.sourceUrl,
    inLanguage: config.locales.defaultLocale,
    isBasedOn: `${config.url}/article/${slug}`,
    isPartOf: { '@id': `${config.url}/blog` },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: featuredImage?.sourceUrl,
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
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
            {t`Read more`}
            <span className="screen-reader-text">
              {' '}
              {t({ message: `about ${title}`, comment: 'Post title' })}
            </span>
            <ArrowIcon />
          </ButtonLink>
        </footer>
        <PostMeta meta={meta} />
      </article>
    </>
  );
};

export default PostPreview;
