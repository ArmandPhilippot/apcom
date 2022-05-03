import Link from '@components/atoms/links/link';
import ResponsiveImage from '@components/molecules/images/responsive-image';
import { type BreadcrumbItem } from '@components/molecules/nav/breadcrumb';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import LegalNoticeContent, { meta } from '@content/pages/legal-notice.mdx';
import { getFormattedDate } from '@utils/helpers/dates';
import { loadTranslation } from '@utils/helpers/i18n';
import useSettings from '@utils/hooks/use-settings';
import { NestedMDXComponents } from 'mdx/types';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import { Article, Graph, WebPage } from 'schema-dts';

/**
 * Legal Notice page.
 */
const LegalNoticePage: NextPage = () => {
  const intl = useIntl();
  const { dates, intro, seo, title } = meta;
  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const breadcrumb: BreadcrumbItem[] = [
    { id: 'home', name: homeLabel, url: '/' },
    { id: 'legal-notice', name: title, url: '/mentions-legales' },
  ];

  const publicationLabel = intl.formatMessage({
    defaultMessage: 'Published on:',
    description: 'Meta: publication date label',
    id: 'QGi5uD',
  });

  const updateLabel = intl.formatMessage({
    defaultMessage: 'Updated on:',
    description: 'Meta: update date label',
    id: 'tLC7bh',
  });

  const headerMeta: PageLayoutProps['headerMeta'] = {
    publication: {
      name: publicationLabel,
      value: getFormattedDate(dates.publication),
    },
    update: { name: updateLabel, value: getFormattedDate(dates.update) },
  };

  const components: NestedMDXComponents = {
    Image: (props) => <ResponsiveImage {...props} />,
    Link: (props) => <Link {...props} />,
  };

  const { website } = useSettings();
  const { asPath } = useRouter();
  const pageUrl = `${website.url}${asPath}`;
  const pagePublicationDate = new Date(dates.publication);
  const pageUpdateDate = new Date(dates.update);

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
    dateModified: pageUpdateDate.toISOString(),
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
      title={title}
      intro={intro}
      headerMeta={headerMeta}
      breadcrumb={breadcrumb}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default LegalNoticePage;
