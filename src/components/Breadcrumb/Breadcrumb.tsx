import { t } from '@lingui/macro';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ pageTitle }: { pageTitle: string }) => {
  const router = useRouter();

  const isHome = router.pathname === '/';
  const isBlog = router.pathname === '/blog';
  const isArticle = router.pathname.includes('/article/');
  const isThematic = router.pathname.includes('/thematique/');
  const isSubject = router.pathname.includes('/sujet/');

  const getItems = () => {
    return (
      <>
        <li className={styles.item}>
          <Link href="/">
            <a>{t`Home`}</a>
          </Link>
        </li>
        {isBlog && <li className={styles.item}>{t`Blog`}</li>}
        {(isArticle || isThematic || isSubject) && (
          <>
            <li className={styles.item}>
              <Link href="/blog">
                <a>{t`Blog`}</a>
              </Link>
            </li>
            <li className={styles.item}>{pageTitle}</li>
          </>
        )}
        {!isBlog && !isArticle && !isThematic && !isSubject && (
          <li className={styles.item}>{pageTitle}</li>
        )}
      </>
    );
  };

  return (
    <>
      {!isHome && (
        <nav>
          <span className="screen-reader-text">{t`You are here:`}</span>
          <ol className={styles.list}>{getItems()}</ol>
        </nav>
      )}
    </>
  );
};

export default Breadcrumb;
