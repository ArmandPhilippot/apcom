import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  getLayout,
  Heading,
  Link,
  LinksListWidget,
  PageLayout,
  SearchForm,
} from '../components';
import {
  getThematicsPreview,
  getTopicsPreview,
  getTotalThematics,
  getTotalTopics,
} from '../services/graphql';
import type {
  NextPageWithLayout,
  RawThematicPreview,
  RawTopicPreview,
} from '../types';
import { ROUTES } from '../utils/constants';
import { getLinksListItems, getPageLinkFromRawData } from '../utils/helpers';
import { loadTranslation, type Messages } from '../utils/helpers/server';
import { useBreadcrumb, useSettings } from '../utils/hooks';

type Error404PageProps = {
  thematicsList: RawThematicPreview[];
  topicsList: RawTopicPreview[];
  translation: Messages;
};

/**
 * Error 404 page.
 */
const Error404Page: NextPageWithLayout<Error404PageProps> = ({
  thematicsList,
  topicsList,
}) => {
  const intl = useIntl();
  const { website } = useSettings();
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
    { websiteName: website.name }
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

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {/*eslint-disable-next-line react/jsx-no-literals -- Name allowed */}
        <meta name="description" content={pageDescription} />
      </Head>
      <PageLayout
        title={title}
        breadcrumb={breadcrumbItems}
        breadcrumbSchema={breadcrumbSchema}
        widgets={[
          <LinksListWidget
            heading={
              <Heading isFake level={3}>
                {thematicsListTitle}
              </Heading>
            }
            items={getLinksListItems(
              thematicsList.map((thematic) =>
                getPageLinkFromRawData(thematic, 'thematic')
              )
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="thematics-list"
          />,
          <LinksListWidget
            heading={
              <Heading isFake level={3}>
                {topicsListTitle}
              </Heading>
            }
            items={getLinksListItems(
              topicsList.map((topic) => getPageLinkFromRawData(topic, 'topic'))
            )}
            // eslint-disable-next-line react/jsx-no-literals -- Key allowed
            key="topics-list"
          />,
        ]}
      >
        {body}
        <p>
          {intl.formatMessage({
            defaultMessage: 'You can also try a search:',
            description: 'Error404Page: try a search message',
            id: 'XKy7rx',
          })}
        </p>
        <SearchForm isLabelHidden searchPage={ROUTES.SEARCH} />
      </PageLayout>
    </>
  );
};

Error404Page.getLayout = (page) =>
  getLayout(page, { useGrid: true, withExtraPadding: true });

export const getStaticProps: GetStaticProps<Error404PageProps> = async ({
  locale,
}) => {
  const totalThematics = await getTotalThematics();
  const thematics = await getThematicsPreview({ first: totalThematics });
  const totalTopics = await getTotalTopics();
  const topics = await getTopicsPreview({ first: totalTopics });
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
