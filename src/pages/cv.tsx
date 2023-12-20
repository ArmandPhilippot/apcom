import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import NextImage from 'next/image';
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
  PageBody,
} from '../components';
import { mdxComponents } from '../components/mdx';
import CVContent, { data, meta } from '../content/pages/cv.mdx';
import type { NextPageWithLayout } from '../types';
import { CONFIG } from '../utils/config';
import { PERSONAL_LINKS, ROUTES } from '../utils/constants';
import { getAboutPageGraph, getSchemaFrom } from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumbs, useHeadingsTree } from '../utils/hooks';

const Toc = dynamic(
  async () => import('../components').then((mod) => mod.TocWidget),
  {
    ssr: false,
  }
);

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

  const jsonLd = getSchemaFrom([
    getAboutPageGraph({
      breadcrumb: breadcrumbSchema,
      copyrightYear: new Date(dates.publication).getFullYear(),
      cover: data.image.src,
      dates,
      description: intro,
      slug: ROUTES.CV,
      title,
    }),
  ]);

  const page = {
    title: `${seo.title} - ${CONFIG.name}`,
    url: `${CONFIG.url}${ROUTES.CV}`,
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
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>
      <PageHeader
        heading={title}
        intro={intro}
        meta={{
          publicationDate: dates.publication,
          updateDate: dates.update,
        }}
      />
      <PageSidebar>
        <Toc
          heading={<Heading level={2}>{messages.toc.title}</Heading>}
          tree={tree}
        />
      </PageSidebar>
      <PageBody ref={ref}>
        <CVContent components={mdxComponents} />
      </PageBody>
      <PageSidebar>
        <ImageWidget
          description={messages.image.caption}
          heading={<Heading level={2}>{messages.image.title}</Heading>}
          img={<NextImage {...data.image} />}
        />
        <SocialMediaWidget
          heading={<Heading level={2}>{messages.socialMedia.title}</Heading>}
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
