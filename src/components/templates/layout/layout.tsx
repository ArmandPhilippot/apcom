import ButtonLink from '@components/atoms/buttons/button-link';
import Career from '@components/atoms/icons/career';
import CCBySA from '@components/atoms/icons/cc-by-sa';
import ComputerScreen from '@components/atoms/icons/computer-screen';
import Envelop from '@components/atoms/icons/envelop';
import Home from '@components/atoms/icons/home';
import PostsStack from '@components/atoms/icons/posts-stack';
import Main from '@components/atoms/layout/main';
import NoScript from '@components/atoms/layout/no-script';
import Footer, { type FooterProps } from '@components/organisms/layout/footer';
import Header, { type HeaderProps } from '@components/organisms/layout/header';
import useScrollPosition from '@utils/hooks/use-scroll-position';
import useSettings from '@utils/hooks/use-settings';
import Script from 'next/script';
import { FC, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  BreadcrumbList,
  Person,
  SearchAction,
  WebSite,
  WithContext,
} from 'schema-dts';
import styles from './layout.module.scss';

export type QueryAction = SearchAction & {
  'query-input': string;
};

export type LayoutProps = Pick<HeaderProps, 'isHome'> & {
  /**
   * The breadcrumb JSON schema.
   */
  breadcrumbSchema: BreadcrumbList['itemListElement'][];
  /**
   * The layout main content.
   */
  children: ReactNode;
  /**
   * Set additional classnames to the article element.
   */
  className?: string;
};

/**
 * Layout component
 *
 * Render the base layout used by all pages.
 */
const Layout: FC<LayoutProps> = ({
  breadcrumbSchema,
  children,
  isHome,
  ...props
}) => {
  const intl = useIntl();
  const { website } = useSettings();
  const { baseline, copyright, locales, name, picture, url } = website;

  const skipToContent = intl.formatMessage({
    defaultMessage: 'Skip to content',
    description: 'Layout: Skip to content link',
    id: 'K4rYdT',
  });
  const noScript = intl.formatMessage({
    defaultMessage:
      'Warning: If you want to benefit from all features (search for example), please activate Javascript.',
    description: 'Layout: noscript message',
    id: '7jVUT6',
  });

  const copyrightData = {
    dates: {
      start: copyright.start,
      end: copyright.end,
    },
    owner: name,
    icon: <CCBySA />,
  };

  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Layout: main nav - home link',
    id: 'bojYF5',
  });
  const blogLabel = intl.formatMessage({
    defaultMessage: 'Blog',
    description: 'Layout: main nav - blog link',
    id: 'D8vB38',
  });
  const projectsLabel = intl.formatMessage({
    defaultMessage: 'Projects',
    description: 'Layout: main nav - projects link',
    id: 'qnwsWV',
  });
  const cvLabel = intl.formatMessage({
    defaultMessage: 'CV',
    description: 'Layout: main nav - cv link',
    id: 'R895yC',
  });
  const contactLabel = intl.formatMessage({
    defaultMessage: 'Contact',
    description: 'Layout: main nav - contact link',
    id: 'AE4kCD',
  });

  const mainNav: HeaderProps['nav'] = [
    { id: 'home', label: homeLabel, href: '/', logo: <Home /> },
    { id: 'blog', label: blogLabel, href: '/blog', logo: <PostsStack /> },
    {
      id: 'projects',
      label: projectsLabel,
      href: '/projets',
      logo: <ComputerScreen />,
    },
    { id: 'cv', label: cvLabel, href: '/cv', logo: <Career /> },
    { id: 'contact', label: contactLabel, href: '/contact', logo: <Envelop /> },
  ];

  const legalNoticeLabel = intl.formatMessage({
    defaultMessage: 'Legal notice',
    description: 'Layout: Legal notice label',
    id: 'nwbzKm',
  });

  const footerNav: FooterProps['navItems'] = [
    { id: 'legal-notice', label: legalNoticeLabel, href: '/mentions-legales' },
  ];

  const searchActionSchema: QueryAction = {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}/recherche?s={search_term_string}`,
    },
    query: 'required',
    'query-input': 'required name=search_term_string',
  };

  const schemaJsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@id': `${url}`,
    '@type': 'WebSite',
    name: name,
    description: baseline,
    url: url,
    author: { '@id': `${url}/#branding` },
    copyrightYear: Number(copyright.start),
    creator: { '@id': `${url}/#branding` },
    editor: { '@id': `${url}/#branding` },
    inLanguage: locales.default,
    potentialAction: searchActionSchema,
  };

  const brandingSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}/#branding`,
    name: name,
    url: url,
    jobTitle: baseline,
    image: picture.src,
    subjectOf: { '@id': `${url}` },
  };

  const [backToTopClassName, setBackToTopClassName] = useState<string>(
    styles['back-to-top--hidden']
  );
  const updateBackToTopClassName = () => {
    setBackToTopClassName(
      window.scrollY > 300
        ? styles['back-to-top--visible']
        : styles['back-to-top--hidden']
    );
  };

  useScrollPosition(updateBackToTopClassName);

  return (
    <>
      <Script
        id="schema-layout"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
      <Script
        id="schema-branding"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandingSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <noscript>
        <div className={styles['noscript-spacing']}></div>
      </noscript>
      <span tabIndex={-1}></span>
      <ButtonLink target="#main" className="screen-reader-text">
        {skipToContent}
      </ButtonLink>
      <Header
        title={name}
        baseline={baseline}
        photo={picture}
        nav={mainNav}
        searchPage="/recherche"
        isHome={isHome}
        withLink={true}
        className={styles.header}
      />
      <Main id="main" className={styles.main}>
        <article {...props}>{children}</article>
      </Main>
      <Footer
        copyright={copyrightData}
        navItems={footerNav}
        topId="top"
        backToTopClassName={backToTopClassName}
        className={styles.footer}
      />
      <noscript>
        <NoScript message={noScript} position="top" />
      </noscript>
    </>
  );
};

export default Layout;
