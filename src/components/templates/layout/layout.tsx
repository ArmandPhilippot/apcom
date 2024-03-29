import Head from 'next/head';
import {
  useRef,
  type FC,
  type ReactElement,
  type ReactNode,
  useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import type { NextPageWithLayoutOptions } from '../../../types';
import { useOnRouteChange } from '../../../utils/hooks';
import { ButtonLink, Main } from '../../atoms';
import styles from './layout.module.scss';
import { SiteFooter } from './site-footer';
import { SiteHeader, type SiteHeaderProps } from './site-header';

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

  const topRef = useRef<HTMLSpanElement>(null);
  const topId = 'top';
  const mainId = 'main';

  const giveFocusToTop = useCallback(() => {
    if (topRef.current) topRef.current.focus();
  }, []);

  useOnRouteChange(giveFocusToTop);

  return (
    <>
      <Head>
        <noscript>
          <style>
            {/* eslint-disable-next-line react/jsx-no-literals */}
            {`.js-only {
                display: none !important;
              }`}
          </style>
        </noscript>
      </Head>
      <span id={topId} ref={topRef} tabIndex={-1} />
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
