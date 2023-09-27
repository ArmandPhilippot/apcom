/* eslint-disable max-statements */
import Script from 'next/script';
import {
  type FC,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import type { Person, SearchAction, WebSite, WithContext } from 'schema-dts';
import type { NextPageWithLayoutOptions } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  useRouteChange,
  useScrollPosition,
  useSettings,
} from '../../../utils/hooks';
import {
  ButtonLink,
  Career,
  CCBySA,
  ComputerScreen,
  Envelop,
  Home,
  Main,
  NoScript,
  PostsStack,
} from '../../atoms';
import {
  SiteFooter,
  type SiteFooterProps,
  SiteHeader,
  type SiteHeaderProps,
} from '../../organisms';
import styles from './layout.module.scss';

export type QueryAction = SearchAction & {
  'query-input': string;
};

export type LayoutProps = Pick<SiteHeaderProps, 'isHome'> & {
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
export const Layout: FC<LayoutProps> = ({
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

  const mainNav: SiteHeaderProps['nav'] = [
    {
      id: 'home',
      label: homeLabel,
      href: '/',
      logo: <Home aria-hidden={true} />,
    },
    {
      id: 'blog',
      label: blogLabel,
      href: ROUTES.BLOG,
      logo: <PostsStack aria-hidden={true} />,
    },
    {
      id: 'projects',
      label: projectsLabel,
      href: ROUTES.PROJECTS,
      logo: <ComputerScreen aria-hidden={true} />,
    },
    {
      id: 'cv',
      label: cvLabel,
      href: ROUTES.CV,
      logo: <Career aria-hidden={true} />,
    },
    {
      id: 'contact',
      label: contactLabel,
      href: ROUTES.CONTACT,
      logo: <Envelop aria-hidden={true} />,
    },
  ];

  const legalNoticeLabel = intl.formatMessage({
    defaultMessage: 'Legal notice',
    description: 'Layout: Legal notice label',
    id: 'nwbzKm',
  });

  const footerNav: SiteFooterProps['navItems'] = [
    { id: 'legal-notice', label: legalNoticeLabel, href: ROUTES.LEGAL_NOTICE },
  ];

  const searchActionSchema: QueryAction = {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}${ROUTES.SEARCH}?s={search_term_string}`,
    },
    query: 'required',
    'query-input': 'required name=search_term_string',
  };

  const schemaJsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@id': `${url}`,
    '@type': 'WebSite',
    name,
    description: baseline,
    url,
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
    name,
    url,
    jobTitle: baseline,
    image: '/armand-philippot.jpg',
    subjectOf: { '@id': `${url}` },
  };

  const [backToTopClassName, setBackToTopClassName] = useState<string>(
    styles['back-to-top--hidden']
  );
  const updateBackToTopClassName = () => {
    const visibleBreakpoint = 300;
    setBackToTopClassName(
      window.scrollY > visibleBreakpoint
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-layout"
        type="application/ld+json"
      />
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandingSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-branding"
        type="application/ld+json"
      />
      <noscript>
        <div className={styles['noscript-spacing']} />
      </noscript>
      <span ref={topRef} tabIndex={-1} />
      <ButtonLink className="screen-reader-text" to="#main">
        {skipToContent}
      </ButtonLink>
      <SiteHeader
        // eslint-disable-next-line react/jsx-no-literals -- Storage key allowed
        ackeeStorageKey="ackee-tracking"
        baseline={baseline}
        className={styles.header}
        isHome={isHome}
        // eslint-disable-next-line react/jsx-no-literals -- Storage key allowed
        motionStorageKey="reduced-motion"
        nav={mainNav}
        // eslint-disable-next-line react/jsx-no-literals -- Photo allowed
        photo="/armand-philippot.jpg"
        searchPage={ROUTES.SEARCH}
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
      <SiteFooter
        backToTopClassName={backToTopClassName}
        className={styles.footer}
        copyright={copyrightData}
        navItems={footerNav}
        topId="top"
      />
      <noscript>
        {/*eslint-disable-next-line react/jsx-no-literals -- Position allowed*/}
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
) => <Layout {...props}>{page}</Layout>;
