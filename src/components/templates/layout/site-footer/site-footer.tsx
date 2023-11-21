import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { CONFIG } from '../../../../utils/config';
import { ROUTES } from '../../../../utils/constants';
import { useScrollPosition } from '../../../../utils/hooks';
import { Footer, type FooterProps, Icon } from '../../../atoms';
import {
  BackToTop,
  Colophon,
  type ColophonLink,
  Copyright,
} from '../../../molecules';
import styles from './site-footer.module.scss';

export type SiteFooterProps = Omit<FooterProps, 'children'> & {
  /**
   * An id that will be use as anchor for the back to top button.
   */
  topId?: string;
};

const SiteFooterWithRef: ForwardRefRenderFunction<
  HTMLElement,
  SiteFooterProps
> = ({ className = '', topId, ...props }, ref) => {
  const footerClass = `${styles.footer} ${className}`;
  const intl = useIntl();
  const licenseName = intl.formatMessage({
    defaultMessage: 'CC BY SA',
    description: 'SiteFooter: the license name',
    id: 'iTLvLX',
  });
  const backToTop = intl.formatMessage({
    defaultMessage: 'Back to top',
    description: 'SiteFooter: an accessible name for the back to top button',
    id: 'OHvb01',
  });
  const footerNav: ColophonLink[] = [
    {
      id: 'legal-notice',
      label: intl.formatMessage({
        defaultMessage: 'Legal notice',
        description: 'SiteFooter: Legal notice link label',
        id: 'lsmD4c',
      }),
      href: ROUTES.LEGAL_NOTICE,
    },
  ];
  const scrollPos = useScrollPosition();
  const backToTopVisibilityBreakpoint = 300;
  const backToTopClassName = [
    styles['back-to-top'],
    styles[
      scrollPos.y > backToTopVisibilityBreakpoint
        ? 'back-to-top--visible'
        : 'back-to-top--hidden'
    ],
  ].join(' ');
  const backToTopAnchor = topId ? `#${topId}` : undefined;

  return (
    <Footer {...props} className={footerClass} ref={ref}>
      <Colophon
        copyright={
          <Copyright
            from={CONFIG.copyright.startYear}
            owner={CONFIG.name}
            to={CONFIG.copyright.endYear}
          />
        }
        license={
          <Icon
            heading={licenseName}
            // eslint-disable-next-line react/jsx-no-literals
            shape="cc-by-sa"
            // eslint-disable-next-line react/jsx-no-literals
            size="lg"
          />
        }
        links={footerNav}
      />
      {backToTopAnchor ? (
        <BackToTop
          anchor={backToTopAnchor}
          className={backToTopClassName}
          label={backToTop}
        />
      ) : null}
    </Footer>
  );
};

export const SiteFooter = forwardRef(SiteFooterWithRef);
