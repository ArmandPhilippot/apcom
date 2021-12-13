import { FunctionComponent } from 'react';
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import Main from '@components/Main/Main';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
