/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Link,
  PageLayout,
  Figure,
  Time,
  MetaList,
  MetaItem,
} from '../components';
import LegalNoticeContent, { meta } from '../content/pages/legal-notice.mdx';
import type { NextPageWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumb } from '../utils/hooks';

const ResponsiveImage = (props: NextImageProps) => (
  <Figure>
    <NextImage {...props} />
  </Figure>
);

const components: MDXComponents = {
  Image: ResponsiveImage,
  Link,
};

/**
 * Legal Notice page.
 */
const LegalNoticePage: NextPageWithLayout = () => {
  const intl = useIntl();
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.LEGAL_NOTICE,
  });

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'legal-notice',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, articleSchema]);
  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${asPath}`,
  };

  return (
    <PageLayout
      breadcrumb={breadcrumbItems}
      breadcrumbSchema={breadcrumbSchema}
      headerMeta={
        <MetaList>
          <MetaItem
            isInline
            label={intl.formatMessage({
              defaultMessage: 'Published on:',
              description: 'Page: publication date label',
              id: '4QbTDq',
            })}
            value={<Time date={dates.publication} />}
          />
          {dates.update ? (
            <MetaItem
              isInline
              label={intl.formatMessage({
                defaultMessage: 'Updated on:',
                description: 'Page: update date label',
                id: 'Ez8Qim',
              })}
              value={<Time date={dates.update} />}
            />
          ) : null}
        </MetaList>
      }
      intro={intro}
      title={title}
      withToC={true}
    >
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-legal-notice"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <LegalNoticeContent components={components} />
    </PageLayout>
  );
};

LegalNoticePage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default LegalNoticePage;
