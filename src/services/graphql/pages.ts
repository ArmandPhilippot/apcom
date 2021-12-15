import {
  FetchPageByUriReturn,
  GetCVPageReturn,
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

export const getCVPage: GetCVPageReturn = async () => {
  const rawCV = await fetchPageByUri('/cv/');

  const formattedCV: Page = {
    ...rawCV,
    content: rawCV.contentParts.afterMore,
    intro: rawCV.contentParts.beforeMore,
  };

  return formattedCV;
};
