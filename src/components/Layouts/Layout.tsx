import { ReactElement, ReactNode } from 'react';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';
import Breadcrumb from '@components/Breadcrumb/Breadcrumb';

const Layout = ({
  children,
  isHome = false,
}: {
  children: ReactNode;
  isHome?: boolean;
}) => {
  return (
    <>
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
