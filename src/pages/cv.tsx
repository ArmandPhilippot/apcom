/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  ImageWidget,
  Link,
  List,
  PageLayout,
  SocialMedia,
  type MetaData,
} from '../components';
import CVContent, { data, meta } from '../content/pages/cv.mdx';
import styles from '../styles/pages/cv.module.scss';
import type { NextPageWithLayout } from '../types';
import { PERSONAL_LINKS, ROUTES } from '../utils/constants';
import {
  getSchemaJson,
  getSinglePageSchema,
  getWebPageSchema,
} from '../utils/helpers';
import { loadTranslation } from '../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../utils/hooks';

const ExternalLink = ({
  children = '',
  href = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link {...props} external={true} href={href}>
    {children}
  </Link>
);

const H1 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={1}>
    {children}
  </Heading>
);

const H2 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={2}>
    {children}
  </Heading>
);

const H3 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={3}>
    {children}
  </Heading>
);

const H4 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={4}>
    {children}
  </Heading>
);

const H5 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={5}>
    {children}
  </Heading>
);

const H6 = ({
  children = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <Heading {...props} level={6}>
    {children}
  </Heading>
);

const components: MDXComponents = {
  a: ExternalLink,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Link,
  List,
};

/**
 * CV page.
 */
const CVPage: NextPageWithLayout = () => {
  const intl = useIntl();
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

  const headerMeta: MetaData = {
    publication: {
      date: dates.publication,
    },
    update: dates.update
      ? {
          date: dates.update,
        }
      : undefined,
  };

  const { website } = useSettings();
  const cvCaption = intl.formatMessage(
    {
      defaultMessage: '<link>Download the CV in PDF</link>',
      id: 'fN04AJ',
      description: 'CVPage: download CV in PDF text',
    },
    {
      link: (chunks: ReactNode) => (
        <Link download={true} href={file}>
          {chunks}
        </Link>
      ),
    }
  );

  const widgets = [
    <ImageWidget
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
      key="image-widget"
      expanded={true}
      title={imageWidgetTitle}
      level={2}
      image={image}
      description={cvCaption}
      imageClassName={styles.image}
    />,
    <SocialMedia
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
      key="social-media"
      title={socialMediaTitle}
      level={2}
      media={[
        { name: 'Github', url: PERSONAL_LINKS.GITHUB },
        { name: 'Gitlab', url: PERSONAL_LINKS.GITLAB },
        {
          name: 'LinkedIn',
          url: PERSONAL_LINKS.LINKEDIN,
        },
      ]}
    />,
  ];

  const { asPath } = useRouter();
  const webpageSchema = getWebPageSchema({
    description: seo.description,
    locale: website.locales.default,
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
    locale: website.locales.default,
    slug: asPath,
    title,
  });
  const schemaJsonLd = getSchemaJson([webpageSchema, cvSchema]);
  const page = {
    title: `${seo.title} - ${website.name}`,
    url: `${website.url}${asPath}`,
  };

  return (
    <PageLayout
      breadcrumb={breadcrumbItems}
      breadcrumbSchema={breadcrumbSchema}
      headerMeta={headerMeta}
      intro={intro}
      title={title}
      widgets={widgets}
      withToC={true}
    >
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
      <CVContent components={components} />
    </PageLayout>
  );
};

CVPage.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translation = await loadTranslation(locale);

  return {
    props: {
      translation,
    },
  };
};

export default CVPage;
