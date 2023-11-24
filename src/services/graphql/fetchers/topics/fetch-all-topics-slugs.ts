import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';
import { fetchTopicsCount } from './fetch-topics-count';

type TopicsSlugsResponse = {
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
 * @returns {Promise<string[]>} The topics slugs.
 */
export const fetchAllTopicsSlugs = async (): Promise<string[]> => {
  const topicsCount = await fetchTopicsCount();
  const response = await fetchGraphQL<TopicsSlugsResponse>({
    query: topicsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: topicsCount },
  });

  if (!response.topics)
    return Promise.reject(new Error('Unable to find the topics slugs.'));

  return response.topics.nodes.map((node) => node.slug);
};
