import Script from 'next/script';
import type { FC, ReactElement, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import type { Person, SearchAction, WebSite, WithContext } from 'schema-dts';
import type { NextPageWithLayoutOptions } from '../../../types';
import { CONFIG } from '../../../utils/config';
import { ROUTES } from '../../../utils/constants';
import { ButtonLink, Main } from '../../atoms';
import styles from './layout.module.scss';
import { SiteFooter } from './site-footer';
import { SiteHeader, type SiteHeaderProps } from './site-header';

export type QueryAction = SearchAction & {
  'query-input': string;
};

export type LayoutProps = Pick<SiteHeaderProps, 'isHome'> & {
  /**
   * The layout main content.
   */
  children: ReactNode;
};

/**
 * Layout component
 *
 * Render the base layout used by all pages.
 */
export const Layout: FC<LayoutProps> = ({ children, isHome }) => {
  const { baseline, copyright, locales, name, url } = CONFIG;
  const intl = useIntl();
  const messages = {
    noScript: intl.formatMessage({
      defaultMessage:
        'Warning: If you want to benefit from all features (search for example), please activate Javascript.',
      description: 'Layout: noscript message',
      id: '7jVUT6',
    }),
    skipToContent: intl.formatMessage({
      defaultMessage: 'Skip to content',
      description: 'Layout: Skip to content link',
      id: 'K4rYdT',
    }),
  };

  const searchActionSchema: QueryAction = {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${url}${ROUTES.SEARCH}?s={search_term_string}`,
    },
    query: 'required',
    'query-input': 'required name=search_term_string',
  };
  const brandingSchema: Person = {
    '@type': 'Person',
    name,
    url,
    jobTitle: baseline,
    image: '/armand-philippot.jpg',
    subjectOf: { '@id': `${url}` },
  };
  const schemaJsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@id': `${url}`,
    '@type': 'WebSite',
    name,
    description: baseline,
    url,
    author: brandingSchema,
    copyrightYear: Number(copyright.startYear),
    creator: brandingSchema,
    editor: brandingSchema,
    inLanguage: locales.defaultLocale,
    potentialAction: searchActionSchema,
  };

  const topId = 'top';
  const mainId = 'main';

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-layout"
        type="application/ld+json"
      />
      <span id={topId} />
      <noscript>
        <div className={styles['noscript-spacing']} />
      </noscript>
      <ButtonLink
        // eslint-disable-next-line react/jsx-no-literals
        className="screen-reader-text"
        // eslint-disable-next-line react/jsx-no-literals
        to={`#${mainId}`}
      >
        {messages.skipToContent}
      </ButtonLink>
      <SiteHeader className={styles.header} isHome={isHome} />
      <Main className={styles.main} id={mainId}>
        {children}
      </Main>
      <SiteFooter topId={topId} />
      <noscript>
        <div className={styles.noscript}>{messages.noScript}</div>
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
  props?: NextPageWithLayoutOptions
) => <Layout {...props}>{page}</Layout>;
