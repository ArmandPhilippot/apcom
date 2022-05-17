import Link from '@components/atoms/links/link';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import { getLayout } from '@components/templates/layout/layout';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import LegalNoticeContent, { meta } from '@content/pages/legal-notice.mdx';
import { type NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { NestedMDXComponents } from 'mdx/types';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Article, Graph, WebPage } from 'schema-dts';

/**
 * Legal Notice page.
 */
const LegalNoticePage: NextPageWithLayout = () => {
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `/mentions-legales`,
  });

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: {
      date: dates.publication,
    },
    update: dates.update
      ? {
          date: dates.update,
        }
      : undefined,
  };

  const components: NestedMDXComponents = {
    Image: (props) => <ResponsiveImage {...props} />,
    Link: (props) => <Link {...props} />,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = dates.update ? new Date(dates.update) : undefined;

  const webpageSchema: WebPage = {
    '@id': `${pageUrl}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${website.url}/#breadcrumb` },
    name: seo.title,
    description: seo.description,
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const articleSchema: Article = {
    '@id': `${website.url}/#legal-notice`,
    '@type': 'Article',
    name: title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    copyrightYear: pagePublicationDate.getFullYear(),
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    headline: title,
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, articleSchema],
  };

  return (
    <PageLayout
      breadcrumb={breadcrumbItems}
      breadcrumbSchema={breadcrumbSchema}
      headerMeta={headerMeta}
      intro={intro}
      title={title}
      withToC={true}
    >
      <Head>
        <title>{`${seo.title} - ${website.name}`}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${seo.title} - ${website.name}`} />
        <meta property="og:description" content={intro} />
      </Head>
      <Script
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
