export type GraphQLPageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  total: number;
};

export type GraphQLEdges<T> = {
  cursor: string;
  node: T;
};

export type GraphQLEdgesInput = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};

export type GraphQLNode<T> = {
  node: T;
};

export type GraphQLNodes<T> = {
  nodes: T[];
};
