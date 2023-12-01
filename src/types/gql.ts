import type { WPCommentStatus } from './data';
import type { Nullable } from './generics';

export type GraphQLNode<T> = {
  node: T;
};

export type GraphQLNodes<T> = {
  nodes: T[];
};

export type GraphQLPageInfo = {
  endCursor: Nullable<string>;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: Nullable<string>;
  total: number;
};

export type GraphQLEdge<T> = GraphQLNode<T> & {
  cursor: string;
};

export type GraphQLConnection<T> = {
  edges: GraphQLEdge<T>[];
  pageInfo: GraphQLPageInfo;
};

export type GraphQLEdgesInput = {
  after?: Nullable<string>;
  before?: Nullable<string>;
  first?: number;
  last?: number;
};

export type GraphQLOrder = 'ASC' | 'DESC';

export type GraphQLCommentWhere = {
  contentId?: number;
  contentName?: string;
  status?: WPCommentStatus;
};

type GraphQLPostFieldOrder =
  | 'AUTHOR'
  | 'COMMENT_COUNT'
  | 'DATE'
  | 'MODIFIED'
  | 'SLUG'
  | 'TITLE';

export type GraphQLPostOrderBy = {
  field: GraphQLPostFieldOrder;
  order: GraphQLOrder;
};

export type GraphQLPostWhere = {
  authorName?: string;
  search?: string;
  title?: string;
};

export type GraphQLTaxonomyFieldOrder = 'DATE' | 'MODIFIED' | 'SLUG' | 'TITLE';

export type GraphQLTaxonomyOrderBy = {
  field: GraphQLTaxonomyFieldOrder;
  order: GraphQLOrder;
};

export type GraphQLTaxonomyWhere = {
  search?: string;
  title?: string;
  notIn?: number[];
};
