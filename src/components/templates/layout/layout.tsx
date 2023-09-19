import Script from 'next/script';
import { FC, ReactElement, ReactNode, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Person, SearchAction, WebSite, WithContext } from 'schema-dts';
import { type NextPageWithLayoutOptions } from '../../../types/app';
import useRouteChange from '../../../utils/hooks/use-route-change';
import useScrollPosition from '../../../utils/hooks/use-scroll-position';
import useSettings from '../../../utils/hooks/use-settings';
import ButtonLink from '../../atoms/buttons/button-link';
import Career from '../../atoms/icons/career';
import CCBySA from '../../atoms/icons/cc-by-sa';
import ComputerScreen from '../../atoms/icons/computer-screen';
import Envelop from '../../atoms/icons/envelop';
import Home from '../../atoms/icons/home';
import PostsStack from '../../atoms/icons/posts-stack';
import Main from '../../atoms/layout/main';
import NoScript from '../../atoms/layout/no-script';
import Footer, { type FooterProps } from '../../organisms/layout/footer';
import Header, { type HeaderProps } from '../../organisms/layout/header';
import photo from '/public/armand-philippot.jpg';
import styles from './layout.module.scss';

export type QueryAction = SearchAction & {
  'query-input': string;
};

export type LayoutProps = Pick<HeaderProps, 'isHome'> & {
  /**
   * The layout main content.
   */
  children: ReactNode;
  /**
   * Determine if article has a comments section.
   */
  withExtraPadding?: boolean;
  /**
   * Determine if article should use grid. Default: false.
   */
  useGrid?: boolean;
};

/**
 * Layout component
 *
 * Render the base layout used by all pages.
 */
const Layout: FC<LayoutProps> = ({
  children,
  withExtraPadding = false,
  isHome,
  useGrid = false,
}) => {
  const intl = useIntl();
  const { website } = useSettings();
  const { baseline, copyright, locales, name, url } = website;
  const articleGridClass = useGrid ? 'article--grid' : '';
  const articleCommentsClass = withExtraPadding ? 'article--padding' : '';

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
    {
      id: 'home',
      label: homeLabel,
      href: '/',
      logo: <Home aria-hidden={true} />,
    },
    {
      id: 'blog',
      label: blogLabel,
      href: '/blog',
      logo: <PostsStack aria-hidden={true} />,
    },
    {
      id: 'projects',
      label: projectsLabel,
      href: '/projets',
      logo: <ComputerScreen aria-hidden={true} />,
    },
    {
      id: 'cv',
      label: cvLabel,
      href: '/cv',
      logo: <Career aria-hidden={true} />,
    },
    {
      id: 'contact',
      label: contactLabel,
      href: '/contact',
      logo: <Envelop aria-hidden={true} />,
    },
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
    image: photo.src,
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
  const topRef = useRef<HTMLSpanElement>(null);
  const giveFocusToTopRef = () => {
    if (topRef.current) topRef.current.focus();
  };
  useRouteChange(giveFocusToTopRef);

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
      <noscript>
        <div className={styles['noscript-spacing']}></div>
      </noscript>
      <span ref={topRef} tabIndex={-1}></span>
      <ButtonLink target="#main" className="screen-reader-text">
        {skipToContent}
      </ButtonLink>
      <Header
        ackeeStorageKey="ackee-tracking"
        baseline={baseline}
        className={styles.header}
        isHome={isHome}
        motionStorageKey="reduced-motion"
        nav={mainNav}
        photo={photo}
        searchPage="/recherche"
        title={name}
        withLink={true}
      />
      <Main id="main" className={styles.main}>
        <article
          className={`${styles[articleGridClass]} ${styles[articleCommentsClass]}`}
        >
          {children}
        </article>
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

/**
 * Get the global layout.
 *
 * @param {ReactElement} page - A page.
 * @param {NextPageWithLayoutOptions} props - An object with layout options.
 * @returns A page wrapped with the global layout.
 */
export const getLayout = (
  page: ReactElement,
  props: NextPageWithLayoutOptions
) => {
  return <Layout {...props}>{page}</Layout>;
};

export default Layout;
