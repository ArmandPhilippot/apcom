import { getLayout } from '@components/Layouts/Layout';
import PostHeader from '@components/PostHeader/PostHeader';
import { seo } from '@config/seo';
import { t, Trans } from '@lingui/macro';
import { NextPageWithLayout } from '@ts/types/app';
import { loadTranslation } from '@utils/helpers/i18n';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const error404: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{seo.error404.title}</title>
        <meta name="description" content={seo.error404.description} />
      </Head>
      <div>
        <PostHeader title={t`Page not found`} />
        <p>
          <Trans>
            Sorry, it seems that the page you are looking for does not exist.
          </Trans>{' '}
          <Trans>
            If you think this path should work, feel free to{' '}
            <Link href="/contact/">contact me</Link> with the necessary
            information so that I can fix the problem.
          </Trans>
        </p>
      </div>
    </>
  );
};

error404.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const translation = await loadTranslation(
    context.locale!,
    process.env.NODE_ENV === 'production'
  );

  const breadcrumbTitle = t`Error`;

  return {
    props: {
      breadcrumbTitle,
      translation,
    },
  };
};

export default error404;
