import { RawTopicPreview, TotalItems } from '@ts/types/raw-data';
import { EdgesResponse, EdgesVars, fetchAPI, getAPIUrl } from './api';
import { topicsListQuery, totalTopicsQuery } from './topics.query';

/**
 * Retrieve the total number of topics.
 *
 * @returns {Promise<number>} - The topics total number.
 */
export const getTotalTopics = async (): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalTopicsQuery>({
    api: getAPIUrl(),
    query: totalTopicsQuery,
  });

  return response.topics.pageInfo.total;
};

/**
 * Retrieve the given number of topics from API.
 *
 * @param {EdgesVars} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawTopicPreview>>} The topics data.
 */
export const getTopicsPreview = async (
  props: EdgesVars
): Promise<EdgesResponse<RawTopicPreview>> => {
  const response = await fetchAPI<RawTopicPreview, typeof topicsListQuery>({
    api: getAPIUrl(),
    query: topicsListQuery,
    variables: props,
  });

  return response.topics;
};

export const getAllTopicsLinks = async () => {
  const allTopics = [];
  const initialTopics = await getTopicsPreview({ first: 1 });

  if (!initialTopics.pageInfo.hasNextPage) return initialTopics;
};
