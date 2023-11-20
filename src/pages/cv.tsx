/* eslint-disable max-statements */
import type { MDXComponents } from 'mdx/types';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
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
  SocialMediaWidget,
  ListItem,
  Time,
  MetaList,
  MetaItem,
} from '../components';
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
import { useBreadcrumb } from '../utils/hooks';

const ExternalLink = ({
  children = '',
  href = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link {...props} isExternal href={href}>
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

const OrderedList = ({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => (
  <List {...props} isOrdered spacing="2xs">
    {children}
  </List>
);

const UnorderedList = ({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => (
  <List {...props} spacing="2xs">
    {children}
  </List>
);

const components: MDXComponents = {
  a: ExternalLink,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  li: ({ ref, ...props }) => <ListItem {...props} />,
  Link,
  ol: OrderedList,
  ul: UnorderedList,
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

  const widgets = [
    <ImageWidget
      description={cvCaption}
      heading={
        <Heading isFake level={3}>
          {imageWidgetTitle}
        </Heading>
      }
      img={<NextImage {...image} />}
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
      key="image-widget"
    />,
    <SocialMediaWidget
      heading={
        <Heading isFake level={3}>
          {socialMediaTitle}
        </Heading>
      }
      // eslint-disable-next-line react/jsx-no-literals -- Key allowed
      key="social-media"
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
    />,
  ];

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
