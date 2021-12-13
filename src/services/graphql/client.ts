import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
  const apiUrl: string = process.env.NEXT_PUBLIC_GRAPHQL_API || '';

  if (!apiUrl) throw new Error('API URL not defined.');

  const graphQLClient = new GraphQLClient(apiUrl);

  return graphQLClient;
};
