import type {
  GraphQLPageInfo,
  GraphQLTaxonomyWhere,
  Nullable,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type ThematicsCountResponse = {
  thematics: Nullable<{
    pageInfo: Pick<GraphQLPageInfo, 'total'>;
  }>;
};

const thematicsCountQuery = `query ThematicsCount($search: String, $title: String) {
  thematics(where: {search: $search, title: $title}) {
    pageInfo {
      total
    }
  }
}`;

/**
 * Retrieve the total of WordPress thematics.
 *
 * @param {GraphQLTaxonomyWhere} [input] - The input to filter the thematics.
 * @returns {Promise<number>} The total number of thematics.
 */
export const fetchThematicsCount = async (
  input?: GraphQLTaxonomyWhere
): Promise<number> => {
  const response = await fetchGraphQL<ThematicsCountResponse>({
    query: thematicsCountQuery,
    url: getGraphQLUrl(),
    variables: { ...input },
  });

  if (!response.thematics)
    return Promise.reject(
      new Error('Unable to find the total number of thematics.')
    );

  return response.thematics.pageInfo.total;
};
