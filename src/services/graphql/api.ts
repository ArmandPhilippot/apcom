import { RequestType, VariablesType } from '@ts/types/app';
import { settings } from '@utils/config';
import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = (): GraphQLClient => {
  const apiUrl = settings.api.url;

  if (!apiUrl) throw new Error('API URL not defined.');

  return new GraphQLClient(apiUrl);
};

export const fetchApi = async <T extends RequestType>(
  query: string,
  variables: VariablesType<T>
): Promise<T> => {
  const client = getGraphQLClient();

  try {
    return await client.request(query, variables);
  } catch (error) {
    console.error(error, undefined, 2);
    process.exit(1);
  }
};
