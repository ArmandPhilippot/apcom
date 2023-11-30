import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from '../../atoms';
import { Page, type PageProps } from './page';
import { PageBody } from './page-body';
import styles from './page.module.scss';

const LoadingPageWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  Omit<PageProps, 'children'>
> = (props, ref) => {
  const intl = useIntl();
  const loadingMsg = intl.formatMessage({
    defaultMessage: 'The requested page is loading...',
    description: 'LoadingPage: loading message',
    id: '0UzObH',
  });

  return (
    <Page {...props} ref={ref}>
      <PageBody>
        <Spinner className={styles.spinner}>{loadingMsg}</Spinner>
      </PageBody>
    </Page>
  );
};

export const LoadingPage = forwardRef(LoadingPageWithRef);
