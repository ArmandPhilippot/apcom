import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, type ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  Link,
  LinksWidget,
  Page,
  PageBody,
  PageHeader,
  PageSidebar,
  SearchForm,
  Spinner,
  type SearchFormSubmit,
} from '../components';
import {
  convertWPThematicPreviewToPageLink,
  convertWPTopicPreviewToPageLink,
  fetchThematicsCount,
  fetchThematicsList,
  fetchTopicsCount,
  fetchTopicsList,
} from '../services/graphql';
import styles from '../styles/pages/blog.module.scss';
import type {
  GraphQLConnection,
  NextPageWithLayout,
  WPThematicPreview,
  WPTopicPreview,
} from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import { getLinksItemData } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb, useThematicsList, useTopicsList } from '../utils/hooks';

const link = (chunks: ReactNode) => <Link href={ROUTES.CONTACT}>{chunks}</Link>;

type Error404PageProps = {
  data: {
    thematics: GraphQLConnection<WPThematicPreview>;
    topics: GraphQLConnection<WPTopicPreview>;
  };
  translation: Messages;
};

/**
 * Error 404 page.
 */
const Error404Page: NextPageWithLayout<Error404PageProps> = ({ data }) => {
  const router = useRouter();
  const intl = useIntl();
  const { isLoading: areThematicsLoading, thematics } = useThematicsList({
    fallback: data.thematics,
    input: { first: data.thematics.pageInfo.total },
  });
  const { isLoading: areTopicsLoading, topics } = useTopicsList({
    fallback: data.topics,
    input: { first: data.topics.pageInfo.total },
  });
  const messages = {
    loading: {
      thematicsList: intl.formatMessage({
        defaultMessage: 'Thematics are loading...',
        description: 'Error404Page: loading thematics message',
        id: '6IAJYx',
      }),
      topicsList: intl.formatMessage({
        defaultMessage: 'Topics are loading...',
        description: 'Error404Page: loading topics message',
        id: 'HnMf0i',
      }),
    },
    page: {
      title: intl.formatMessage({
        defaultMessage: 'Page not found',
        description: 'Error404Page: page title',
        id: 'KnWeKh',
      }),
    },
    seo: {
      title: intl.formatMessage(
        {
          defaultMessage: 'Error 404: Page not found - {websiteName}',
          description: 'Error404Page: SEO - Page title',
          id: 'pNIIU1',
        },
        { websiteName: CONFIG.name }
      ),
      metaDesc: intl.formatMessage({
        defaultMessage: 'Page not found.',
        description: 'Error404Page: SEO - Meta description',
        id: 'yKoGqg',
      }),
    },
    widgets: {
      thematicsListTitle: intl.formatMessage({
        defaultMessage: 'Thematics',
        description: 'Error404Page: thematics list widget title',
        id: 'HohQPh',
      }),
      topicsListTitle: intl.formatMessage({
        defaultMessage: 'Topics',
        description: 'Error404Page: topics list widget title',
        id: 'GVpTIl',
      }),
    },
  };
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title: messages.page.title,
    url: ROUTES.NOT_FOUND,
  });

  const searchSubmitHandler: SearchFormSubmit = useCallback(
    async ({ query }) => {
      if (!query)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: 'Error404Page: invalid query message',
              id: '3u29G5',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      await router.push({ pathname: ROUTES.SEARCH, query: { s: query } });

      return undefined;
    },
    [intl, router]
  );

  return (
    <Page breadcrumbs={breadcrumbItems}>
      <Head>
        <title>{messages.seo.title}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={messages.seo.metaDesc} />
      </Head>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader heading={messages.page.title} />
      <PageBody className={styles['no-results']}>
        <p>
          {intl.formatMessage(
            {
              defaultMessage:
                'Sorry, it seems that the page your are looking for does not exist. If you think this path should work, feel free to <link>contact me</link> with the necessary information so that I can fix the problem.',
              id: '9sGNKq',
              description: 'Error404Page: page body',
            },
            { link }
          )}
        </p>
        <p>
          {intl.formatMessage({
            defaultMessage: 'You can also try a search:',
            description: 'Error404Page: try a search message',
            id: 'XKy7rx',
          })}
        </p>
        <SearchForm isLabelHidden onSubmit={searchSubmitHandler} />
      </PageBody>
      <PageSidebar>
        {areThematicsLoading ? (
          <Spinner>{messages.loading.thematicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.thematicsListTitle}</Heading>
            }
            items={getLinksItemData(
              thematics.edges.map((edge) =>
                convertWPThematicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
        {areTopicsLoading ? (
          <Spinner>{messages.loading.topicsList}</Spinner>
        ) : (
          <LinksWidget
            heading={
              <Heading level={2}>{messages.widgets.topicsListTitle}</Heading>
            }
            items={getLinksItemData(
              topics.edges.map((edge) =>
                convertWPTopicPreviewToPageLink(edge.node)
              )
            )}
          />
        )}
      </PageSidebar>
    </Page>
  );
};

Error404Page.getLayout = (page) => getLayout(page);

export const getStaticProps: GetStaticProps<Error404PageProps> = async ({
  locale,
}) => {
  const totalThematics = await fetchThematicsCount();
  const thematics = await fetchThematicsList({ first: totalThematics });
  const totalTopics = await fetchTopicsCount();
  const topics = await fetchTopicsList({ first: totalTopics });
  const translation = await loadTranslation(locale);

  return {
    props: {
      data: {
        thematics,
        topics,
      },
      translation,
    },
  };
};

export default Error404Page;
