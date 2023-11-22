/* eslint-disable max-statements */
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { type ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  ImageWidget,
  Link,
  SocialMediaWidget,
  Page,
  PageHeader,
  PageSidebar,
  TocWidget,
  PageBody,
} from '../components';
import { mdxComponents } from '../components/mdx';
import CVContent, { data, meta } from '../content/pages/cv.mdx';
import type { NextPageWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { PERSONAL_LINKS, ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumb, useHeadingsTree } from '../utils/hooks';

/**
 * CV page.
 */
const CVPage: NextPageWithLayout = () => {
  const intl = useIntl();
  const { ref, tree } = useHeadingsTree({ fromLevel: 2 });
  const { file, image } = data;
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.CV,
  });

  const imageWidgetTitle = intl.formatMessage({
    defaultMessage: 'Others formats',
    description: 'CVPage: cv preview widget title',
    id: 'B9OCyV',
  });
  const socialMediaTitle = intl.formatMessage({
    defaultMessage: 'Open-source projects',
    description: 'CVPage: social media widget title',
    id: '+Dre5J',
  });
  const tocTitle = intl.formatMessage({
    defaultMessage: 'Table of Contents',
    description: 'PageLayout: table of contents title',
    id: 'eys2uX',
  });

  const cvCaption = intl.formatMessage(
    {
      defaultMessage: '<link>Download the CV in PDF</link>',
      id: 'fN04AJ',
      description: 'CVPage: download CV in PDF text',
    },
    {
      link: (chunks: ReactNode) => (
        <Link href={file} isDownload>
          {chunks}
        </Link>
      ),
    }
  );

  const githubLabel = intl.formatMessage({
    defaultMessage: 'Github profile',
    description: 'CVPage: Github profile link',
    id: 'Jm0a6H',
  });
  const gitlabLabel = intl.formatMessage({
    defaultMessage: 'Gitlab profile',
    description: 'CVPage: Gitlab profile link',
    id: '++U2Hm',
  });
  const linkedinLabel = intl.formatMessage({
    defaultMessage: 'LinkedIn profile',
    description: 'CVPage: LinkedIn profile link',
    id: 'Sm2wCk',
  });

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const cvSchema = getSinglePageSchema({
    cover: image.src,
    dates,
    description: intro,
    id: 'cv',
    kind: 'about',
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, cvSchema]);
  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${asPath}`,
  };

  return (
    <Page breadcrumbs={breadcrumbItems} isBodyLastChild>
      <Head>
        <title>{page.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={page.url} />
        {/*eslint-disable-next-line react/jsx-no-literals -- Content allowed */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <meta property="og:image" content={image.src} />
        <meta property="og:image:alt" content={title} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-cv"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
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
          heading={<Heading level={3}>{tocTitle}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        <CVContent components={mdxComponents} />
      </PageBody>
      <PageSidebar>
        <ImageWidget
          description={cvCaption}
          heading={
            <Heading isFake level={3}>
              {imageWidgetTitle}
            </Heading>
          }
          img={<NextImage {...image} />}
        />
        <SocialMediaWidget
          heading={
            <Heading isFake level={3}>
              {socialMediaTitle}
            </Heading>
          }
          media={[
            {
              icon: 'Github',
              id: 'github',
              label: githubLabel,
              url: PERSONAL_LINKS.GITHUB,
            },
            {
              icon: 'Gitlab',
              id: 'gitlab',
              label: gitlabLabel,
              url: PERSONAL_LINKS.GITLAB,
            },
            {
              icon: 'LinkedIn',
              id: 'linkedin',
              label: linkedinLabel,
              url: PERSONAL_LINKS.LINKEDIN,
            },
          ]}
        />
      </PageSidebar>
    </Page>
  );
};

CVPage.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default CVPage;
