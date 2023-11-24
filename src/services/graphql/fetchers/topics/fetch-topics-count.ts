import type {
  GraphQLPageInfo,
  GraphQLTaxonomyWhere,
  Nullable,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type TopicsCountResponse = {
  topics: Nullable<{
    pageInfo: Pick<GraphQLPageInfo, 'total'>;
  }>;
};

const topicsCountQuery = `query TopicsCount($search: String, $title: String) {
  topics(where: {search: $search, title: $title}) {
    pageInfo {
      total
    }
  }
}`;

/**
 * Retrieve the total of WordPress topics.
 *
 * @param {GraphQLTaxonomyWhere} [input] - The input to filter the topics.
 * @returns {Promise<number>} The total number of topics.
 */
export const fetchTopicsCount = async (
  input?: GraphQLTaxonomyWhere
): Promise<number> => {
  const response = await fetchGraphQL<TopicsCountResponse>({
    query: topicsCountQuery,
    url: getGraphQLUrl(),
    variables: { ...input },
  });

  if (!response.topics)
    return Promise.reject(
      new Error('Unable to find the total number of topics.')
    );

  return response.topics.pageInfo.total;
};
