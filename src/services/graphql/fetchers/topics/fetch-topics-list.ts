import type {
  GraphQLConnection,
  GraphQLEdgesInput,
  GraphQLTaxonomyOrderBy,
  GraphQLTaxonomyWhere,
  Nullable,
  WPTopicPreview,
} from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

type TopicsListResponse = {
  topics: Nullable<GraphQLConnection<WPTopicPreview>>;
};

const topicsListQuery = `query TopicsList($after: String, $before: String, $first: Int, $last: Int, $orderby: [PostObjectsConnectionOrderbyInput], $search: String, $title: String) {
  topics(
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
            slug
            title
          }
        }
        slug
        title
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      total
    }
  }
}`;

export type FetchTopicsListInput = GraphQLEdgesInput & {
  orderBy?: GraphQLTaxonomyOrderBy;
  where?: GraphQLTaxonomyWhere;
};

/**
 * Retrieve a paginated list of WordPress topics.
 *
 * @param {FetchTopicsListInput} input - The input to retrieve topics.
 * @returns {Promise<GraphQLConnection<WPTopicPreview>>} The paginated topics.
 */
export const fetchTopicsList = async ({
  orderBy,
  where,
  ...vars
}: FetchTopicsListInput): Promise<GraphQLConnection<WPTopicPreview>> => {
  const response = await fetchGraphQL<TopicsListResponse>({
    query: topicsListQuery,
    url: getGraphQLUrl(),
    variables: {
      ...vars,
      ...where,
      orderBy: orderBy ? [orderBy] : undefined,
    },
  });

  if (!response.topics) return Promise.reject(new Error('No topics found.'));

  return response.topics;
};
