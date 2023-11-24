import type { Nullable } from '../../types';
import { CONFIG } from '../config';

/**
 * Retrieve the API url from settings.
 *
 * @returns {string} The API url.
 */
export const getGraphQLUrl = (): string => {
  if (!CONFIG.api.url) throw new Error('You forgot to define the API url.');

  return CONFIG.api.url;
};

export type GraphQLData<T> = Record<string, Nullable<T>>;

type GraphQLResponse<T extends GraphQLData<unknown>> = {
  data: T;
  errors?: { message: string }[];
};

export type FetchGraphQLConfig = {
  query: string;
  url: string;
  variables?: Record<string, unknown>;
};

/**
 * Retrieve GraphQL data using fetch.
 *
 * @template T - The expected data type.
 * @param {FetchGraphQLConfig} config - A configuration object.
 * @returns {Promise<T>} The data.
 */
export const fetchGraphQL = async <
  T extends GraphQLData<unknown> = GraphQLData<unknown>,
>({
  query,
  url,
  variables,
}: FetchGraphQLConfig): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const { data, errors }: GraphQLResponse<T> = await response.json();

  if (!response.ok) {
    const error = new Error(
      errors?.map((e) => e.message).join('\n') ?? 'Network response was not OK'
    );

    return Promise.reject(error);
  }

  return data;
};
