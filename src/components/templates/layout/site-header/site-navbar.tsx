import { useRouter } from 'next/router';
import {
  type FormEvent,
  useCallback,
  type ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from 'react';
import { useIntl } from 'react-intl';
import { ROUTES } from '../../../../utils/constants';
import { Icon } from '../../../atoms';
import {
  MainNav,
  type MainNavItem,
  Navbar,
  SearchForm,
  type SearchFormSubmit,
  SettingsForm,
  type NavbarProps,
  NavbarItem,
  type SearchFormRef,
  type NavbarItemActivationHandler,
} from '../../../organisms';
import styles from './site-header.module.scss';

export type SiteNavbarProps = Omit<NavbarProps, 'children'>;

const SiteNavbarWithRef: ForwardRefRenderFunction<
  HTMLUListElement,
  SiteNavbarProps
> = (props, ref) => {
  const router = useRouter();
  const intl = useIntl();
  const labels = {
    mainNavItem: intl.formatMessage({
      defaultMessage: 'Open menu',
      description: 'SiteNavbar: main nav button label in navbar',
      id: '2By3AZ',
    }),
    mainNavModal: intl.formatMessage({
      defaultMessage: 'Main navigation',
      description: 'SiteNavbar: main nav accessible name',
      id: 'QQAcaS',
    }),
    searchItem: intl.formatMessage({
      defaultMessage: 'Open search',
      id: 'Z/rsgm',
      description: 'SiteNavbar: search button label in navbar',
    }),
    searchModal: intl.formatMessage({
      defaultMessage: 'Search',
      description: 'SiteNavbar: search modal title in navbar',
      id: '5eq0+c',
    }),
    settingsItem: intl.formatMessage({
      defaultMessage: 'Open settings',
      id: 'l50cYa',
      description: 'SiteNavbar: settings button label in navbar',
    }),
    settingsForm: intl.formatMessage({
      defaultMessage: 'Settings form',
      id: 'zhjPcZ',
      description:
        'SiteNavbar: an accessible name for the settings form in navbar',
    }),
    settingsModal: intl.formatMessage({
      defaultMessage: 'Settings',
      description: 'SiteNavbar: settings modal title in navbar',
      id: 'uKef8u',
    }),
  };
  const mainNav: MainNavItem[] = [
    {
      id: 'home',
      label: intl.formatMessage({
        defaultMessage: 'Home',
        description: 'SiteNavbar: main nav - home link',
        id: 'PnrHgZ',
      }),
      href: '/',
      // eslint-disable-next-line react/jsx-no-literals
      logo: <Icon aria-hidden={true} shape="home" />,
    },
    {
      id: 'blog',
      label: intl.formatMessage({
        defaultMessage: 'Blog',
        description: 'SiteNavbar: main nav - blog link',
        id: '5C+1PP',
      }),
      href: ROUTES.BLOG,
      // eslint-disable-next-line react/jsx-no-literals
      logo: <Icon aria-hidden={true} shape="posts-stack" />,
    },
    {
      id: 'projects',
      label: intl.formatMessage({
        defaultMessage: 'Projects',
        description: 'SiteNavbar: main nav - projects link',
        id: 'JXLaT8',
      }),
      href: ROUTES.PROJECTS,
      // eslint-disable-next-line react/jsx-no-literals
      logo: <Icon aria-hidden={true} shape="computer" />,
    },
    {
      id: 'cv',
      label: intl.formatMessage({
        defaultMessage: 'CV',
        description: 'SiteNavbar: main nav - cv link',
        id: 'MJLr6U',
      }),
      href: ROUTES.CV,
      // eslint-disable-next-line react/jsx-no-literals
      logo: <Icon aria-hidden={true} shape="career" />,
    },
    {
      id: 'contact',
      label: intl.formatMessage({
        defaultMessage: 'Contact',
        description: 'SiteNavbar: main nav - contact link',
        id: 'XGmQXV',
      }),
      href: ROUTES.CONTACT,
      // eslint-disable-next-line react/jsx-no-literals
      logo: <Icon aria-hidden={true} shape="envelop" />,
    },
  ];
  const settingsSubmitHandler = useCallback((e: FormEvent) => {
    e.preventDefault();
  }, []);

  const searchFormRef = useRef<SearchFormRef>(null);
  const giveFocusToSearchInput: NavbarItemActivationHandler = useCallback(
    (isActive) => {
      if (isActive) searchFormRef.current?.focus();
    },
    []
  );
  const searchSubmitHandler: SearchFormSubmit = useCallback(
    async ({ query }) => {
      if (!query)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'SiteNavbar: invalid query message',
              id: 'nRzO0T',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      await router.push({ pathname: ROUTES.SEARCH, query: { s: query } });

      return undefined;
    },
    [intl, router]
  );

  return (
    <Navbar {...props} ref={ref}>
      <NavbarItem
        // eslint-disable-next-line react/jsx-no-literals
        icon="hamburger"
        // eslint-disable-next-line react/jsx-no-literals
        id="main-nav"
        label={labels.mainNavItem}
        // eslint-disable-next-line react/jsx-no-literals
        modalVisibleFrom="md"
      >
        <MainNav aria-label={labels.mainNavModal} items={mainNav} />
      </NavbarItem>
      <NavbarItem
        activationHandlerDelay={300}
        // eslint-disable-next-line react/jsx-no-literals
        icon="magnifying-glass"
        // eslint-disable-next-line react/jsx-no-literals
        id="search"
        label={labels.searchItem}
        modalHeading={labels.searchModal}
        onActivation={giveFocusToSearchInput}
      >
        <SearchForm
          className={styles.search}
          isLabelHidden
          onSubmit={searchSubmitHandler}
          ref={searchFormRef}
        />
      </NavbarItem>
      <NavbarItem
        // eslint-disable-next-line react/jsx-no-literals
        icon="cog"
        // eslint-disable-next-line react/jsx-no-literals
        id="settings"
        label={labels.settingsItem}
        modalHeading={labels.settingsModal}
        showIconOnModal
      >
        <SettingsForm
          aria-label={labels.settingsForm}
          className={styles.settings}
          onSubmit={settingsSubmitHandler}
        />
      </NavbarItem>
    </Navbar>
  );
};

export const SiteNavbar = forwardRef(SiteNavbarWithRef);
