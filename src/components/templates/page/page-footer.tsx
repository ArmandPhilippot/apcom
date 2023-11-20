import NextImage from 'next/image';
import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import type { PageLink } from '../../../types';
import { Footer, type FooterProps, ButtonLink } from '../../atoms';
import { MetaList, MetaItem } from '../../molecules';
import styles from './page.module.scss';

export type PageFooterProps = Omit<FooterProps, 'children'> & {
  readMoreAbout: PageLink[];
};

const PageFooterWithRef: ForwardRefRenderFunction<
  HTMLElement,
  PageFooterProps
> = ({ className = '', readMoreAbout, ...props }, ref) => {
  const footerClass = `${styles.footer} ${className}`;
  const intl = useIntl();
  const metaLabel = intl.formatMessage({
    defaultMessage: 'Read more posts about:',
    description: 'PageFooter: the topics list label',
    id: 'I6vhfk',
  });

  return (
    <Footer {...props} className={footerClass} ref={ref}>
      {readMoreAbout.length ? (
        <MetaList>
          <MetaItem
            hasInlinedValues
            label={metaLabel}
            value={readMoreAbout.map((item) => {
              return {
                id: `${item.id}`,
                value: (
                  <ButtonLink className={styles.btn} to={item.url}>
                    <>
                      {item.logo ? (
                        <NextImage {...item.logo} className={styles.logo} />
                      ) : null}
                      {item.name}
                    </>
                  </ButtonLink>
                ),
              };
            })}
          />
        </MetaList>
      ) : null}
    </Footer>
  );
};

export const PageFooter = forwardRef(PageFooterWithRef);
