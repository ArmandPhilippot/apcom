/* eslint-disable max-statements */
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
  type SearchFormSubmit,
} from '../components';
import {
  convertTaxonomyToPageLink,
  fetchThematicsCount,
  fetchThematicsList,
  fetchTopicsCount,
  fetchTopicsList,
} from '../services/graphql';
import type {
  NextPageWithLayout,
  WPThematicPreview,
  WPTopicPreview,
} from '../types';
import { CONFIG } from '../utils/config';
import { ROUTES } from '../utils/constants';
import { getLinksItemData } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb } from '../utils/hooks';

type Error404PageProps = {
  thematicsList: WPThematicPreview[];
  topicsList: WPTopicPreview[];
  translation: Messages;
};

/**
 * Error 404 page.
 */
const Error404Page: NextPageWithLayout<Error404PageProps> = ({
  thematicsList,
  topicsList,
}) => {
  const router = useRouter();
  const intl = useIntl();
  const title = intl.formatMessage({
    defaultMessage: 'Page not found',
    description: 'Error404Page: page title',
    id: 'KnWeKh',
  });
  const body = intl.formatMessage(
    {
      defaultMessage:
        'Sorry, it seems that the page your are looking for does not exist. If you think this path should work, feel free to <link>contact me</link> with the necessary information so that I can fix the problem.',
      id: '9sGNKq',
      description: 'Error404Page: page body',
    },
    {
      link: (chunks: ReactNode) => <Link href={ROUTES.CONTACT}>{chunks}</Link>,
    }
  );
  const { items: breadcrumbItems, schema: breadcrumbSchema } = useBreadcrumb({
    title,
    url: ROUTES.NOT_FOUND,
  });
  const pageTitle = intl.formatMessage(
    {
      defaultMessage: 'Error 404: Page not found - {websiteName}',
      description: '404Page: SEO - Page title',
      id: '310o3F',
    },
    { websiteName: CONFIG.name }
  );
  const pageDescription = intl.formatMessage({
    defaultMessage: 'Page not found.',
    description: '404Page: SEO - Meta description',
    id: '48Ww//',
  });
  const thematicsListTitle = intl.formatMessage({
    defaultMessage: 'Thematics',
    description: 'Error404Page: thematics list widget title',
    id: 'HohQPh',
  });

  const topicsListTitle = intl.formatMessage({
    defaultMessage: 'Topics',
    description: 'Error404Page: topics list widget title',
    id: 'GVpTIl',
  });
  const searchSubmitHandler: SearchFormSubmit = useCallback(
    ({ query }) => {
      if (!query)
        return {
          messages: {
            error: intl.formatMessage({
              defaultMessage: 'Query must be longer than one character.',
              description: '404Page: invalid query message',
              id: 'C6oK7h',
            }),
          },
          validator: (value) => value.query.length > 1,
        };

      router.push({ pathname: ROUTES.SEARCH, query: { s: query } });

      return undefined;
    },
    [intl, router]
  );

  return (
    <Page breadcrumbs={breadcrumbItems}>
      <Head>
        <title>{pageTitle}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={pageDescription} />
      </Head>
      <Script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        // eslint-disable-next-line react/jsx-no-literals -- Id allowed
        id="schema-breadcrumb"
        type="application/ld+json"
      />
      <PageHeader heading={title} />
      <PageBody>
        {body}
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
        <LinksWidget
          heading={
            <Heading isFake level={3}>
              {thematicsListTitle}
            </Heading>
          }
          items={getLinksItemData(thematicsList.map(convertTaxonomyToPageLink))}
        />
        <LinksWidget
          heading={
            <Heading isFake level={3}>
              {topicsListTitle}
            </Heading>
          }
          items={getLinksItemData(topicsList.map(convertTaxonomyToPageLink))}
        />
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
      thematicsList: thematics.edges.map((edge) => edge.node),
      topicsList: topics.edges.map((edge) => edge.node),
      translation,
    },
  };
};

export default Error404Page;
