import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import { config } from '@config/website';
import styles from '@styles/pages/Page.module.scss';
import { NextPageWithLayout } from '@ts/types/app';
import { getIntlInstance, loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

const Error404: NextPageWithLayout = () => {
  const intl = useIntl();

  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Error 404: Page not found - {websiteName}',
      description: '404Page: SEO - Page title',
    },
    { websiteName: config.name }
  );
  const pageDescription = intl.formatMessage({
    defaultMessage: 'Page not found.',
    description: '404Page: SEO - Meta description',
  });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <div className={`${styles.article} ${styles['article--no-comments']}`}>
        <PostHeader
          title={intl.formatMessage({
            defaultMessage: 'Page not found',
            description: '404Page: page title',
          })}
        />
        <div className={styles.body}>
          <FormattedMessage
            defaultMessage="Sorry, it seems that the page your are looking for does not exist. If you think this path should work, feel free to <link>contact me</link> with the necessary information so that I can fix the problem."
            description="404Page: page body"
            values={{
              link: (chunks: string) => (
                <Link href="/contact/">
                  <a>{chunks}</a>
                </Link>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
};

Error404.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const intl = await getIntlInstance();
  const breadcrumbTitle = intl.formatMessage({
    defaultMessage: 'Error 404',
    description: '404Page: breadcrumb item',
  });
  const { locale } = context;
  const translation = await loadTranslation(locale);

  return {
    props: {
      breadcrumbTitle,
      locale,
      translation,
    },
  };
};

export default Error404;
