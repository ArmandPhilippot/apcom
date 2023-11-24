import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLTaxonomyOrderBy,
  GraphQLTaxonomyWhere,
  Nullable,
  WPThematicPreview,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type ThematicsListResponse = {
  thematics: Nullable<GraphQLConnection<WPThematicPreview>>;
};

const thematicsListQuery = `query ThematicsList($after: String, $before: String, $first: Int, $last: Int, $orderby: [PostObjectsConnectionOrderbyInput], $search: String, $title: String) {
  thematics(
    after: $after
    before: $before
    first: $first
    last: $last
    where: {orderby: $orderby, search: $search, title: $title}
  ) {
    edges {
      cursor
      node {
        contentParts {
          beforeMore
        }
        databaseId
        featuredImage {
          node {
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
            title
          }
        }
        slug
        title
      }
    }
  }
}`;

export type FetchThematicsListInput = GraphQLEdgesInput & {
  orderBy?: GraphQLTaxonomyOrderBy;
  where?: GraphQLTaxonomyWhere;
};

/**
 * Retrieve a paginated list of WordPress thematics.
 *
 * @param {FetchThematicsListInput} input - The input to retrieve thematics.
 * @returns {Promise<GraphQLConnection<WPThematicPreview>>} The paginated thematics.
 */
export const fetchThematicsList = async ({
  orderBy,
  where,
  ...vars
}: FetchThematicsListInput): Promise<GraphQLConnection<WPThematicPreview>> => {
  const response = await fetchGraphQL<ThematicsListResponse>({
    query: thematicsListQuery,
    url: getGraphQLUrl(),
    variables: {
      ...vars,
      ...where,
      orderBy: orderBy ? [orderBy] : undefined,
    },
  });

  if (!response.thematics)
    return Promise.reject(new Error('No thematics found.'));

  return response.thematics;
};
