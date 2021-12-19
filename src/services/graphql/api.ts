import { RequestType, VariablesType } from '@ts/types/app';
import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = (): GraphQLClient => {
  const apiUrl: string = process.env.NEXT_PUBLIC_GRAPHQL_API || '';

  if (!apiUrl) throw new Error('API URL not defined.');

  const graphQLClient = new GraphQLClient(apiUrl);

  return graphQLClient;
};

export const fetchApi = async <T extends RequestType>(
  query: string,
  variables: VariablesType<T>
): Promise<T> => {
  const client = getGraphQLClient();

  try {
    const response = await client.request(query, variables);
    return response;
  } catch (error) {
    console.error(error, undefined, 2);
    process.exit(1);
  }
};
