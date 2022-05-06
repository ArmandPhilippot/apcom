import { settings } from '@utils/config';
import {
  articleBySlugQuery,
  articlesCardQuery,
  articlesQuery,
  articlesSlugQuery,
  totalArticlesQuery,
} from './articles.query';
import { commentsQuery } from './comments.query';
import { sendMailMutation } from './contact.mutation';
import {
  thematicBySlugQuery,
  thematicsListQuery,
  thematicsSlugQuery,
} from './thematics.query';
import {
  topicBySlugQuery,
  topicsListQuery,
  topicsSlugQuery,
} from './topics.query';

export type Mutations = typeof sendMailMutation;

export type Queries =
  | typeof articlesQuery
  | typeof articleBySlugQuery
  | typeof articlesCardQuery
  | typeof articlesSlugQuery
  | typeof commentsQuery
  | typeof thematicBySlugQuery
  | typeof thematicsListQuery
  | typeof thematicsSlugQuery
  | typeof topicBySlugQuery
  | typeof topicsListQuery
  | typeof topicsSlugQuery
  | typeof totalArticlesQuery;

export type ArticleResponse<T> = {
  post: T;
};

export type ArticlesResponse<T> = {
  posts: T;
};

export type CommentsResponse<T> = {
  comments: T[];
};

export type SendMailResponse<T> = {
  sendEmail: T;
};

export type ThematicResponse<T> = {
  thematic: T;
};

export type ThematicsResponse<T> = {
  thematics: T;
};

export type TopicResponse<T> = {
  topic: T;
};

export type TopicsResponse<T> = {
  topics: T;
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  total: number;
};

export type Edges<T> = {
  cursor: string;
  node: T;
};

export type EdgesResponse<T> = {
  edges: Edges<T>[];
  pageInfo: PageInfo;
};

export type NodeResponse<T> = {
  node: T;
};

export type NodesResponse<T> = {
  nodes: T[];
};

export type ResponseMap<T> = {
  [articleBySlugQuery]: ArticleResponse<T>;
  [articlesCardQuery]: ArticlesResponse<NodesResponse<T>>;
  [articlesQuery]: ArticlesResponse<EdgesResponse<T>>;
  [articlesSlugQuery]: ArticlesResponse<EdgesResponse<T>>;
  [commentsQuery]: CommentsResponse<NodesResponse<T>>;
  [sendMailMutation]: SendMailResponse<T>;
  [thematicBySlugQuery]: ThematicResponse<T>;
  [thematicsListQuery]: ThematicsResponse<EdgesResponse<T>>;
  [thematicsSlugQuery]: ThematicsResponse<EdgesResponse<T>>;
  [topicBySlugQuery]: TopicResponse<T>;
  [topicsListQuery]: TopicsResponse<EdgesResponse<T>>;
  [topicsSlugQuery]: TopicsResponse<EdgesResponse<T>>;
  [totalArticlesQuery]: ArticlesResponse<T>;
};

export type GraphQLResponse<
  T extends keyof ResponseMap<U>,
  U
> = ResponseMap<U>[T];

export type BySlugVar = {
  /**
   * A slug.
   */
  slug: string;
};

export type EdgesVars = {
  /**
   * A cursor.
   */
  after?: string;
  /**
   * The number of items to return.
   */
  first: number;
  /**
   * A search query.
   */
  search?: string;
};

export type ByContentIdVar = {
  /**
   * An article id.
   */
  contentId: number;
};

export type sendMailVars = {
  body: string;
  clientMutationId: string;
  replyTo: string;
  subject: string;
};

export type VariablesMap = {
  [articleBySlugQuery]: BySlugVar;
  [articlesCardQuery]: EdgesVars;
  [articlesQuery]: EdgesVars;
  [articlesSlugQuery]: EdgesVars;
  [commentsQuery]: ByContentIdVar;
  [sendMailMutation]: sendMailVars;
  [thematicBySlugQuery]: BySlugVar;
  [thematicsListQuery]: EdgesVars;
  [thematicsSlugQuery]: EdgesVars;
  [topicBySlugQuery]: BySlugVar;
  [topicsListQuery]: EdgesVars;
  [topicsSlugQuery]: EdgesVars;
  [totalArticlesQuery]: null;
};

export type FetchAPIProps<T extends Queries | Mutations> = {
  /**
   * A GraphQL API URL.
   */
  api: string;
  /**
   * A GraphQL query.
   */
  query: T;
  /**
   * (Optional) The query variables.
   */
  variables?: VariablesMap[T];
};

/**
 * Fetch a GraphQL API.
 * @param {object} obj - An object.
 * @param {string} obj.api - A GraphQL API URL.
 * @param {Queries} obj.query - A GraphQL query.
 * @param {object} [obj.variables] - The query variables.
 */
export async function fetchAPI<T, U extends Queries | Mutations>({
  api,
  query,
  variables,
}: FetchAPIProps<U>): Promise<GraphQLResponse<U, T>> {
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  type JSONResponse = {
    data?: GraphQLResponse<U, T>;
    errors?: Array<{ message: string }>;
  };

  const { data, errors }: JSONResponse = await response.json();

  if (response.ok) {
    if (!data) return Promise.reject(new Error(`No data found"`));

    return data;
  } else {
    console.error('Failed to fetch API');
    const error = new Error(
      errors?.map((e) => e.message).join('\n') ?? 'unknown'
    );
    return Promise.reject(error);
  }
}

/**
 * Retrieve the API url from settings.
 *
 * @returns {string} The API url.
 */
export const getAPIUrl = (): string => {
  const { url } = settings.api;

  if (!url) {
    throw new Error('API url is not defined.');
  }

  return url;
};
