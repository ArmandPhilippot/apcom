import { ReactElement, ReactNode, useEffect } from 'react';
import Prism from 'prismjs';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';
import { t } from '@lingui/macro';
import 'prism-themes/themes/prism-coldark-cold.min.css';
import { addPrismClasses, translateCopyButton } from '@utils/helpers/prism';
import { useRouter } from 'next/router';
import { config } from '@config/website';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
  const router = useRouter();
  const locale = router.locale ? router.locale : config.defaultLocale;

  useEffect(() => {
    addPrismClasses();
    Prism.highlightAll();
  });

  useEffect(() => {
    translateCopyButton(locale);
  }, [locale]);

  return (
    <>
      <a href="#main" className="screen-reader-text">{t`Skip to content`}</a>
      <Header isHome={isHome} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export const getLayout = (page: ReactElement) => {
  const pageTitle: string = page.props.breadcrumbTitle;

  return (
    <Layout>
      <Breadcrumb pageTitle={pageTitle} />
      {page}
    </Layout>
  );
};

export default Layout;
