import {
  articleBySlugQuery,
  articlesCardQuery,
  articlesEndCursorQuery,
  articlesQuery,
  articlesSlugQuery,
  totalArticlesQuery,
} from '@services/graphql/articles.query';
import { commentsQuery } from '@services/graphql/comments.query';
import {
  thematicBySlugQuery,
  thematicsListQuery,
  thematicsSlugQuery,
  totalThematicsQuery,
} from '@services/graphql/thematics.query';
import {
  topicBySlugQuery,
  topicsListQuery,
  topicsSlugQuery,
  totalTopicsQuery,
} from '@services/graphql/topics.query';
import { Slug } from '../app';
import { RawComment } from '../raw-data';
import {
  GraphQLEdges,
  GraphQLEdgesInput,
  GraphQLNodes,
  GraphQLPageInfo,
} from './generics';

//===========================================================================
// Existing queries list
//===========================================================================

export type Queries =
  | typeof articlesQuery
  | typeof articleBySlugQuery
  | typeof articlesCardQuery
  | typeof articlesEndCursorQuery
  | typeof articlesSlugQuery
  | typeof commentsQuery
  | typeof thematicBySlugQuery
  | typeof thematicsListQuery
  | typeof thematicsSlugQuery
  | typeof topicBySlugQuery
  | typeof topicsListQuery
  | typeof topicsSlugQuery
  | typeof totalArticlesQuery
  | typeof totalThematicsQuery
  | typeof totalTopicsQuery;

//===========================================================================
// Queries response types
//===========================================================================

export type ArticleResponse<T> = {
  post: T;
};

export type ArticlesResponse<T> = {
  posts: T;
};

export type CommentsResponse<T> = {
  comments: T;
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

export type EdgesResponse<T> = {
  edges: GraphQLEdges<T>[];
  pageInfo: GraphQLPageInfo;
};

export type EndCursorResponse = {
  pageInfo: Pick<GraphQLPageInfo, 'endCursor'>;
};

export type QueriesResponseMap<T> = {
  [articleBySlugQuery]: ArticleResponse<T>;
  [articlesCardQuery]: ArticlesResponse<GraphQLNodes<T>>;
  [articlesEndCursorQuery]: ArticlesResponse<EndCursorResponse>;
  [articlesQuery]: ArticlesResponse<EdgesResponse<T>>;
  [articlesSlugQuery]: ArticlesResponse<EdgesResponse<T>>;
  [commentsQuery]: CommentsResponse<EdgesResponse<T>>;
  [thematicBySlugQuery]: ThematicResponse<T>;
  [thematicsListQuery]: ThematicsResponse<EdgesResponse<T>>;
  [thematicsSlugQuery]: ThematicsResponse<EdgesResponse<T>>;
  [topicBySlugQuery]: TopicResponse<T>;
  [topicsListQuery]: TopicsResponse<EdgesResponse<T>>;
  [topicsSlugQuery]: TopicsResponse<EdgesResponse<T>>;
  [totalArticlesQuery]: ArticlesResponse<T>;
  [totalThematicsQuery]: ThematicsResponse<T>;
  [totalTopicsQuery]: TopicsResponse<T>;
};

//===========================================================================
// Queries input types
//===========================================================================

export type QueryEdges = Pick<GraphQLEdgesInput, 'after' | 'first'>;

export type ContentId = {
  contentId: number;
};

export type Search = {
  search?: string;
};

export type QueriesInputMap = {
  [articleBySlugQuery]: Slug;
  [articlesCardQuery]: QueryEdges & Search;
  [articlesEndCursorQuery]: QueryEdges & Search;
  [articlesQuery]: QueryEdges & Search;
  [articlesSlugQuery]: QueryEdges & Search;
  [commentsQuery]: ContentId & QueryEdges;
  [thematicBySlugQuery]: Slug;
  [thematicsListQuery]: QueryEdges & Search;
  [thematicsSlugQuery]: QueryEdges & Search;
  [topicBySlugQuery]: Slug;
  [topicsListQuery]: QueryEdges & Search;
  [topicsSlugQuery]: QueryEdges & Search;
  [totalArticlesQuery]: Search;
  [totalThematicsQuery]: null;
  [totalTopicsQuery]: null;
};

export type CommentPage = {
  comments: RawComment[];
  hasNextPage: boolean;
  endCursor: string;
};
