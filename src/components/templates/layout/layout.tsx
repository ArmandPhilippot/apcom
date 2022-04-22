import photo from '@assets/images/armand-philippot.jpg';
import ButtonLink from '@components/atoms/buttons/button-link';
import Career from '@components/atoms/icons/career';
import CCBySA from '@components/atoms/icons/cc-by-sa';
import ComputerScreen from '@components/atoms/icons/computer-screen';
import Envelop from '@components/atoms/icons/envelop';
import Home from '@components/atoms/icons/home';
import PostsStack from '@components/atoms/icons/posts-stack';
import Main from '@components/atoms/layout/main';
import NoScript from '@components/atoms/layout/no-script';
import Footer from '@components/organisms/layout/footer';
import Header, { HeaderProps } from '@components/organisms/layout/header';
import { settings } from '@utils/config';
import { FC, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styles from './layout.module.scss';

export type LayoutProps = Pick<HeaderProps, 'isHome'> & {
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
const Layout: FC<LayoutProps> = ({ children, isHome, ...props }) => {
  const intl = useIntl();
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

  const copyright = {
    dates: {
      start: settings.copyright.startYear,
      end: settings.copyright.endYear,
    },
    owner: settings.name,
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

  const nav: HeaderProps['nav'] = [
    { id: 'home', label: homeLabel, href: '#', logo: <Home /> },
    { id: 'blog', label: blogLabel, href: '#', logo: <PostsStack /> },
    {
      id: 'projects',
      label: projectsLabel,
      href: '#',
      logo: <ComputerScreen />,
    },
    { id: 'cv', label: cvLabel, href: '#', logo: <Career /> },
    { id: 'contact', label: contactLabel, href: '#', logo: <Envelop /> },
  ];

  return (
    <>
      <noscript>
        <div className={styles['noscript-spacing']}></div>
      </noscript>
      <span tabIndex={-1}></span>
      <ButtonLink target="#main" className="screen-reader-text">
        {skipToContent}
      </ButtonLink>
      <Header
        title={settings.name}
        baseline={settings.baseline.fr}
        photo={photo.src}
        nav={nav}
        isHome={isHome}
        className={styles.header}
        withLink={true}
      />
      <Main id="main" className={styles.main}>
        <article {...props}>{children}</article>
      </Main>
      <Footer copyright={copyright} topId="top" className={styles.footer} />
      <noscript>
        <NoScript message={noScript} position="top" />
      </noscript>
    </>
  );
};

export default Layout;
