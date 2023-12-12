import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Page,
  PageHeader,
  PageSidebar,
  TocWidget,
  Heading,
  PageBody,
} from '../components';
import { mdxComponents } from '../components/mdx';
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
import { useBreadcrumbs, useHeadingsTree } from '../utils/hooks';

/**
 * Legal Notice page.
 */
const LegalNoticePage: NextPageWithLayout = () => {
  const intl = useIntl();
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } =
    useBreadcrumbs(title);
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });

  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.LEGAL_NOTICE,
    title: seo.title,
    updateDate: dates.update,
  });
  const articleSchema = getSinglePageSchema({
    dates,
    description: intro,
    id: 'legal-notice',
    kind: 'page',
    locale: CONFIG.locales.defaultLocale,
    slug: ROUTES.LEGAL_NOTICE,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    articleSchema,
    breadcrumbSchema,
  ]);

  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${ROUTES.LEGAL_NOTICE}`,
  };
  const tocTitle = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'PageLayout: table of contents title',
    id: 'eys2uX',
  });

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
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
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: dates.publication,
          updateDate: dates.update,
        }}
      />
      <PageSidebar>
        <TocWidget
          heading={<Heading level={2}>{tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        <LegalNoticeContent components={mdxComponents} />
      </PageBody>
    </Page>
  );
};

LegalNoticePage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default LegalNoticePage;
