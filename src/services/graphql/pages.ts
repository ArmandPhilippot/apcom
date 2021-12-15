import {
  FetchPageByUriReturn,
  GetPageReturn,
  Page,
  PageResponse,
  RawPage,
} from '@ts/types/pages';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

const fetchPageByUri: FetchPageByUriReturn = async (uri: string) => {
  const client = getGraphQLClient();
  const query = gql`
    query PageByUri($uri: String!) {
      pageBy(uri: $uri) {
        contentParts {
          afterMore
          beforeMore
        }
        date
        modified
        title
      }
    }
  `;

  const variables = { uri };

  try {
    const response: PageResponse = await client.request(query, variables);
    return response.pageBy;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
};

const getFormattedPage = (page: RawPage) => {
  const formattedPage: Page = {
    ...page,
    content: page.contentParts.afterMore,
    intro: page.contentParts.beforeMore,
  };

  return formattedPage;
};

export const getCVPage: GetPageReturn = async () => {
  const rawCV = await fetchPageByUri('/cv/');
  const formattedCV = getFormattedPage(rawCV);

  return formattedCV;
};

export const getLegalNoticePage: GetPageReturn = async () => {
  const rawLegalNotice = await fetchPageByUri('/mentions-legales');
  const formattedLegalNotice = getFormattedPage(rawLegalNotice);

  return formattedLegalNotice;
};
