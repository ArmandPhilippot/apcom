import Link from '@components/atoms/links/link';
import ImageWidget from '@components/organisms/widgets/image-widget';
import SocialMedia from '@components/organisms/widgets/social-media';
import PageLayout, {
  type PageLayoutProps,
} from '@components/templates/page/page-layout';
import CVContent, { data, meta } from '@content/pages/cv.mdx';
import styles from '@styles/pages/cv.module.scss';
import { loadTranslation } from '@utils/helpers/i18n';
import useBreadcrumb from '@utils/hooks/use-breadcrumb';
import useSettings from '@utils/hooks/use-settings';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { AboutPage, Graph, WebPage } from 'schema-dts';

/**
 * CV page.
 */
const CVPage: NextPage = () => {
  const intl = useIntl();
  const { file, image } = data;
  const { dates, intro, seo, title } = meta;
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: `/cv`,
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

  const { website } = useSettings();
  const cvAlt = intl.formatMessage(
    {
      defaultMessage: '{name} CV',
      description: 'CVPage: CV image alternative text',
      id: 'KUowUk',
    },
    { name: website.name }
  );
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
      key="image-widget"
      expanded={true}
      title={imageWidgetTitle}
      level={2}
      image={{ alt: cvAlt, ...image }}
      description={cvCaption}
      imageClassName={styles.image}
    />,
    <SocialMedia
      key="social-media"
      title={socialMediaTitle}
      level={2}
      media={[
        { name: 'Github', url: 'https://github.com/ArmandPhilippot' },
        { name: 'Gitlab', url: 'https://gitlab.com/ArmandPhilippot' },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/armandphilippot',
        },
      ]}
    />,
  ];

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
    reviewedBy: { '@id': `${website.url}/#branding` },
    url: `${pageUrl}`,
    isPartOf: {
      '@id': `${website.url}`,
    },
  };

  const cvSchema: AboutPage = {
    '@id': `${website.url}/#cv`,
    '@type': 'AboutPage',
    name: seo.title,
    description: intro,
    author: { '@id': `${website.url}/#branding` },
    creator: { '@id': `${website.url}/#branding` },
    dateCreated: pagePublicationDate.toISOString(),
    dateModified: pageUpdateDate && pageUpdateDate.toISOString(),
    datePublished: pagePublicationDate.toISOString(),
    editor: { '@id': `${website.url}/#branding` },
    image: image.src,
    inLanguage: website.locales.default,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: image.src,
    mainEntityOfPage: { '@id': `${pageUrl}` },
  };

  const schemaJsonLd: Graph = {
    '@context': 'https://schema.org',
    '@graph': [webpageSchema, cvSchema],
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
        <title>{`${seo.title} - ${website.name}`}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:url" content={`${pageUrl}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={intro} />
        <meta property="og:image" content={image.src} />
        <meta property="og:image:alt" content={title} />
      </Head>
      <Script
        id="schema-cv"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <CVContent />
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

export default CVPage;
