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
import { PERSONAL_LINKS } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumbs, useHeadingsTree } from '../utils/hooks';

const DownloadLink = (chunks: ReactNode) => (
  <Link href={data.file} isDownload>
    {chunks}
  </Link>
);

/**
 * CV page.
 */
const CVPage: NextPageWithLayout = () => {
  const intl = useIntl();
  const { ref, tree } = useHeadingsTree<HTMLDivElement>({ fromLevel: 2 });
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } =
    useBreadcrumbs(title);
  const messages = {
    image: {
      caption: intl.formatMessage(
        {
          defaultMessage: '<link>Download the CV in PDF</link>',
          id: 'fN04AJ',
          description: 'CVPage: download CV in PDF text',
        },
        {
          link: DownloadLink,
        }
      ),
      title: intl.formatMessage({
        defaultMessage: 'Others formats',
        description: 'CVPage: cv preview widget title',
        id: 'B9OCyV',
      }),
    },
    socialMedia: {
      github: intl.formatMessage({
        defaultMessage: 'Github profile',
        description: 'CVPage: Github profile link',
        id: 'Jm0a6H',
      }),
      gitlab: intl.formatMessage({
        defaultMessage: 'Gitlab profile',
        description: 'CVPage: Gitlab profile link',
        id: '++U2Hm',
      }),
      linkedin: intl.formatMessage({
        defaultMessage: 'LinkedIn profile',
        description: 'CVPage: LinkedIn profile link',
        id: 'Sm2wCk',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Open-source projects',
        description: 'CVPage: social media widget title',
        id: '+Dre5J',
      }),
    },
    toc: {
      title: intl.formatMessage({
        defaultMessage: 'Table of Contents',
        description: 'PageLayout: table of contents title',
        id: 'eys2uX',
      }),
    },
  };

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title: seo.title,
    updateDate: dates.update,
  });
  const cvSchema = getSinglePageSchema({
    cover: data.image.src,
    dates,
    description: intro,
    id: 'cv',
    kind: 'about',
    locale: CONFIG.locales.defaultLocale,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([
    webpageSchema,
    cvSchema,
    breadcrumbSchema,
  ]);
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
        <meta property="og:image" content={data.image.src} />
        <meta property="og:image:alt" content={title} />
      </Head>
      <Script
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-cv"
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
          heading={<Heading level={3}>{messages.toc.title}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        <CVContent components={mdxComponents} />
      </PageBody>
      <PageSidebar>
        <ImageWidget
          description={messages.image.caption}
          heading={
            <Heading isFake level={3}>
              {messages.image.title}
            </Heading>
          }
          img={<NextImage {...data.image} />}
        />
        <SocialMediaWidget
          heading={
            <Heading isFake level={3}>
              {messages.socialMedia.title}
            </Heading>
          }
          media={[
            {
              icon: 'Github',
              id: 'github',
              label: messages.socialMedia.github,
              url: PERSONAL_LINKS.GITHUB,
            },
            {
              icon: 'Gitlab',
              id: 'gitlab',
              label: messages.socialMedia.gitlab,
              url: PERSONAL_LINKS.GITLAB,
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
