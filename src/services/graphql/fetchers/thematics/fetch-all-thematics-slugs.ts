import type { GraphQLNodes, Nullable, SlugNode } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';
import { fetchThematicsCount } from './fetch-thematics-count';

type ThematicsSlugsResponse = {
  thematics: Nullable<GraphQLNodes<SlugNode>>;
};

const thematicsSlugsQuery = `query ThematicsSlugs($first: Int) {
  thematics(first: $first) {
    nodes {
      slug
    }
  }
}`;

/**
 * Retrieve the WordPress thematics slugs.
 *
 * @returns {Promise<string[]>} The thematics slugs.
 */
export const fetchAllThematicsSlugs = async (): Promise<string[]> => {
  const thematicsCount = await fetchThematicsCount();
  const response = await fetchGraphQL<ThematicsSlugsResponse>({
    query: thematicsSlugsQuery,
    url: getGraphQLUrl(),
    variables: { first: thematicsCount },
  });

  if (!response.thematics)
    return Promise.reject(new Error('Unable to find the thematics slugs.'));

  return response.thematics.nodes.map((node) => node.slug);
};
