import { gql } from 'graphql-request';
import {
  fetchHomePageReturn,
  getHomePageReturn,
  HomePage,
  HomePageResponse,
} from '@ts/types/homepage';
import { getGraphQLClient } from './client';

export const fetchHomepage: fetchHomePageReturn = async () => {
  const client = getGraphQLClient();
  const query = gql`
    query HomePage {
      nodeByUri(uri: "/") {
        ... on Page {
          id
          content
        }
      }
    }
  `;

  try {
    const response: HomePageResponse = await client.request(query);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
};

export const getHomePage: getHomePageReturn = async () => {
  const rawHomePage = await fetchHomepage();
  const homePage: HomePage = rawHomePage.nodeByUri;
  return homePage;
};
