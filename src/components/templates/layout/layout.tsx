/* eslint-disable max-statements */
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import {
  type FC,
  type ReactElement,
  type ReactNode,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import type { Person, SearchAction, WebSite, WithContext } from 'schema-dts';
import type { NextPageWithLayoutOptions } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  useAutofocus,
  useBoolean,
  useRouteChange,
  useScrollPosition,
  useSettings,
} from '../../../utils/hooks';
import {
  ButtonLink,
  Footer,
  Header,
  Heading,
  Icon,
  Logo,
  Main,
} from '../../atoms';
import {
  BackToTop,
  Branding,
  Colophon,
  type ColophonLink,
  Copyright,
  FlippingLogo,
} from '../../molecules';
import {
  type MainNavItem,
  Navbar,
  MainNav,
  SearchForm,
  SettingsForm,
  type NavbarItems,
  type SearchFormSubmit,
} from '../../organisms';
import styles from './layout.module.scss';

export type QueryAction = SearchAction & {
  'query-input': string;
};

export type LayoutProps = {
  /**
   * The layout main content.
   */
  children: ReactNode;
  /**
   * Is it homepage?
   *
   * @default false
   */
  isHome?: boolean;
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
  const router = useRouter();
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
  const copyrightTitle = intl.formatMessage({
    defaultMessage: 'CC BY SA',
    description: 'Layout: copyright title',
    id: 'yB1SPF',
  });

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
  const photoAltText = intl.formatMessage(
    {
      defaultMessage: '{website} picture',
      description: 'Layout: photo alternative text',
      id: '8jjY1X',
    },
    { website: name }
  );
  const logoTitle = intl.formatMessage(
    {
      defaultMessage: '{website} logo',
      description: 'Layout: logo title',
      id: '52H2HA',
    },
    { website: name }
  );
  const backToTop = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'Layout: an accessible name for the back to top button',
    id: 'Kjj1Zk',
  });

  const mainNav: MainNavItem[] = [
    {
      id: 'home',
      label: homeLabel,
      href: '/',
      logo: <Icon aria-hidden={true} shape="home" />,
    },
    {
      id: 'blog',
      label: blogLabel,
      href: ROUTES.BLOG,
      logo: <Icon aria-hidden={true} shape="posts-stack" />,
    },
    {
      id: 'projects',
      label: projectsLabel,
      href: ROUTES.PROJECTS,
      logo: <Icon aria-hidden={true} shape="computer" />,
    },
    {
      id: 'cv',
      label: cvLabel,
      href: ROUTES.CV,
      logo: <Icon aria-hidden={true} shape="career" />,
    },
    {
      id: 'contact',
      label: contactLabel,
      href: ROUTES.CONTACT,
      logo: <Icon aria-hidden={true} shape="envelop" />,
    },
  ];

  const {
    deactivate: deactivateMainNav,
    state: isMainNavOpen,
    toggle: toggleMainNav,
  } = useBoolean(false);
  const {
    deactivate: deactivateSearch,
    state: isSearchOpen,
    toggle: toggleSearch,
  } = useBoolean(false);
  const {
    deactivate: deactivateSettings,
    state: isSettingsOpen,
    toggle: toggleSettings,
  } = useBoolean(false);
  const labels = {
    mainNavItem: intl.formatMessage({
      defaultMessage: 'Open menu',
      description: 'Layout: main nav button label in navbar',
      id: 'Fgt/RZ',
    }),
    mainNavModal: intl.formatMessage({
      defaultMessage: 'Main navigation',
      description: 'Layout: main nav accessible name',
      id: 'dfTljv',
    }),
    searchItem: intl.formatMessage({
      defaultMessage: 'Open search',
      id: 'XRwEoA',
      description: 'Layout: search button label in navbar',
    }),
    searchModal: intl.formatMessage({
      defaultMessage: 'Search',
      description: 'Layout: search modal title in navbar',
      id: 'Mq+O6q',
    }),
    settingsItem: intl.formatMessage({
      defaultMessage: 'Open settings',
      id: 'mDKiaN',
      description: 'Layout: settings button label in navbar',
    }),
    settingsForm: intl.formatMessage({
      defaultMessage: 'Settings form',
      id: 'h3J0a+',
      description: 'Layout: an accessible name for the settings form in navbar',
    }),
    settingsModal: intl.formatMessage({
      defaultMessage: 'Settings',
      description: 'Layout: settings modal title in navbar',
      id: 'o3WSz5',
    }),
  };

  const settingsSubmitHandler = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  const searchInputRef = useAutofocus<HTMLInputElement>({
    condition: () => isSearchOpen,
    delay: 360,
  });
  const searchSubmitHandler: SearchFormSubmit = useCallback(
    ({ query }) => {
      if (!query)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'Layout: invalid query message',
              id: 'C2YcUJ',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      router.push({ pathname: ROUTES.SEARCH, query: { s: query } });

      return undefined;
    },
    [intl, router]
  );

  useRouteChange(deactivateSearch);

  const navbarItems: NavbarItems = [
    {
      contents: <MainNav aria-label={labels.mainNavModal} items={mainNav} />,
      icon: 'hamburger',
      id: 'main-nav',
      isActive: isMainNavOpen,
      label: labels.mainNavItem,
      modalVisibleFrom: 'md',
      onDeactivate: deactivateMainNav,
      onToggle: toggleMainNav,
    },
    {
      contents: (
        <SearchForm
          className={styles.search}
          isLabelHidden
          onSubmit={searchSubmitHandler}
          ref={searchInputRef}
        />
      ),
      icon: 'magnifying-glass',
      id: 'search',
      isActive: isSearchOpen,
      label: labels.searchItem,
      onDeactivate: deactivateSearch,
      onToggle: toggleSearch,
      modalHeading: labels.searchModal,
    },
    {
      contents: (
        <SettingsForm
          aria-label={labels.settingsForm}
          className={styles.settings}
          onSubmit={settingsSubmitHandler}
        />
      ),
      icon: 'cog',
      id: 'settings',
      isActive: isSettingsOpen,
      label: labels.settingsItem,
      onDeactivate: deactivateSettings,
      onToggle: toggleSettings,
      modalHeading: labels.settingsModal,
      showIconOnModal: true,
    },
  ];

  const legalNoticeLabel = intl.formatMessage({
    defaultMessage: 'Legal notice',
    description: 'Layout: Legal notice label',
    id: 'nwbzKm',
  });

  const footerNav: ColophonLink[] = [
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
    `${styles['back-to-top']} ${styles['back-to-top--hidden']}`
  );
  const updateBackToTopClassName = () => {
    const visibleBreakpoint = 300;
    setBackToTopClassName(
      window.scrollY > visibleBreakpoint
        ? `${styles['back-to-top']} ${styles['back-to-top--visible']}`
        : `${styles['back-to-top']} ${styles['back-to-top--hidden']}`
    );
  };

  useScrollPosition(updateBackToTopClassName);

  const topRef = useRef<HTMLSpanElement>(null);
  const giveFocusToTopRef = () => {
    if (topRef.current) topRef.current.focus();
  };

  useRouteChange(giveFocusToTopRef);

  const brandingTitleStyles = {
    '--typing-animation':
      'blink 0.7s ease-in-out 0s 2, typing 4.3s linear 0s 1',
  } as CSSProperties;
  const brandingBaselineStyles = {
    '--typing-animation':
      'hide-text 4.25s linear 0s 1, blink 0.8s ease-in-out 4.25s 2, typing 3.8s linear 4.25s 1',
  } as CSSProperties;

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
      <Header className={styles.header}>
        <div className={styles.header__body}>
          <Branding
            baseline={
              <div
                className={styles.brand__baseline}
                style={brandingBaselineStyles}
              >
                {baseline}
              </div>
            }
            logo={
              <FlippingLogo
                back={<Logo heading={logoTitle} />}
                className={styles.brand__logo}
                front={
                  <NextImage
                    alt={photoAltText}
                    height={120}
                    src="/armand-philippot.jpg"
                    width={120}
                  />
                }
              />
            }
            name={
              <Heading
                className={styles.brand__title}
                isFake={!isHome}
                level={1}
                style={brandingTitleStyles}
              >
                {name}
              </Heading>
            }
            url="/"
          />
          <Navbar items={navbarItems} />
        </div>
      </Header>
      <Main id="main" className={styles.main}>
        <article
          className={`${styles[articleGridClass]} ${styles[articleCommentsClass]}`}
        >
          {children}
        </article>
      </Main>
      <Footer className={styles.footer}>
        <Colophon
          copyright={
            <Copyright from={copyright.start} owner={name} to={copyright.end} />
          }
          license={<Icon heading={copyrightTitle} shape="cc-by-sa" size="lg" />}
          links={footerNav}
        />
        <BackToTop
          anchor="#top"
          className={backToTopClassName}
          label={backToTop}
        />
      </Footer>
      <noscript>
        <div className={styles.noscript}>{noScript}</div>
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
