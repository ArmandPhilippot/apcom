import { t } from '@lingui/macro';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ pageTitle }: { pageTitle: string }) => {
  const router = useRouter();

  const isHome = router.pathname === '/';
  const isArticle = router.pathname.includes('/article/');
  const isThematic = router.pathname.includes('/thematique/');
  const isSubject = router.pathname.includes('/sujet/');

  const getItems = () => {
    return (
      <>
        <Head>
          <script type="application/ld+json">{}</script>
        </Head>
        <li className={styles.item}>
          <Link href="/">
            <a>{t`Home`}</a>
          </Link>
        </li>
        {(isArticle || isThematic || isSubject) && (
          <>
            <li className={styles.item}>
              <Link href="/blog">
                <a>{t`Blog`}</a>
              </Link>
            </li>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {!isHome && (
        <nav className={styles.wrapper}>
          <span className="screen-reader-text">{t`You are here:`}</span>
          <ol className={styles.list}>{getItems()}</ol>
        </nav>
      )}
    </>
  );
};

export default Breadcrumb;
