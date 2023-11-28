import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type TopicsSlugsResponse = {
  topics: Nullable<GraphQLNodes<SlugNode>>;
};

const topicsSlugsQuery = `query TopicsSlugs($first: Int) {
  topics(first: $first) {
    nodes {
      slug
    }
  }
}`;

/**
 * Retrieve the WordPress topics slugs.
 *
 * @param {number} count - The number of topics slugs to retrieve.
 * @returns {Promise<string[]>} The topics slugs.
 */
export const fetchAllTopicsSlugs = async (count: number): Promise<string[]> => {
  const response = await fetchGraphQL<TopicsSlugsResponse>({
    query: topicsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: count },
  });

  if (!response.topics)
    return Promise.reject(new Error('Unable to find the topics slugs.'));

  return response.topics.nodes.map((node) => node.slug);
};
