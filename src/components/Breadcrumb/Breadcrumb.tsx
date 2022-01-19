import { config } from '@config/website';
import { t } from '@lingui/macro';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BreadcrumbList, WithContext } from 'schema-dts';
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
        <li className="screen-reader-text">{pageTitle}</li>
      </>
    );
  };

  const getElementsSchema = () => {
    const items = [];
    const homepage: BreadcrumbList['itemListElement'] = {
      '@type': 'ListItem',
      position: 1,
      name: t`Home`,
      item: config.url,
    };

    items.push(homepage);

    if (isArticle || isThematic || isSubject) {
      const blog: BreadcrumbList['itemListElement'] = {
        '@type': 'ListItem',
        position: 2,
        name: t`Blog`,
        item: `${config.url}/blog`,
      };

      items.push(blog);
    }

    const currentPage: BreadcrumbList['itemListElement'] = {
      '@type': 'ListItem',
      position: items.length + 1,
      name: pageTitle,
      item: `${config.url}${router.asPath}`,
    };

    items.push(currentPage);

    return items;
  };

  const schemaJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${config.url}/#breadcrumb`,
    itemListElement: getElementsSchema(),
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
        ></script>
      </Head>
      {!isHome && (
        <nav id="breadcrumb" className={styles.wrapper}>
          <span className="screen-reader-text">{t`You are here:`}</span>
          <ol className={styles.list}>{getItems()}</ol>
        </nav>
      )}
    </>
  );
};

export default Breadcrumb;
