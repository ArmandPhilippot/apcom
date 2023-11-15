import type {
  Mutations,
  MutationsInputMap,
  MutationsResponseMap,
  Queries,
  QueriesInputMap,
  QueriesResponseMap,
} from '../../types';
import { CONFIG } from '../../utils/config';

/**
 * Retrieve the API url from settings.
 *
 * @returns {string} The API url.
 */
export const getAPIUrl = (): string => {
  const { url } = CONFIG.api;

  if (!url) {
    throw new Error('API url is not defined.');
  }

  return url;
};

export type ResponseMap<T, K extends Mutations | Queries> = K extends Mutations
  ? MutationsResponseMap<T>
  : QueriesResponseMap<T>;

export type InputMap<T extends Mutations | Queries> = T extends Mutations
  ? MutationsInputMap
  : QueriesInputMap;

type FetchAPIVariables<T> = T extends Queries
  ? QueriesInputMap[T]
  : T extends Mutations
  ? MutationsInputMap[T]
  : never;

type FetchAPIProps<Q extends Queries | Mutations, V = FetchAPIVariables<Q>> = {
  query: Q;
  variables?: V;
};

type FetchAPIResponse<T, K extends Queries | Mutations> = K extends Queries
  ? QueriesResponseMap<T>[K]
  : K extends Mutations
  ? MutationsResponseMap<T>[K]
  : never;

export const fetchAPI = async <T, K extends Queries | Mutations>({
  query,
  variables,
}: FetchAPIProps<K>): Promise<FetchAPIResponse<T, K>> => {
  const response = await fetch(getAPIUrl(), {
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
    data?: FetchAPIResponse<T, K>;
    errors?: { message: string }[];
  };

  const { data, errors }: JSONResponse = await response.json();

  if (response.ok) {
    if (!data) return Promise.reject(new Error(`No data found"`));

    return data;
  }
  console.error('Failed to fetch API');
  const error = new Error(
    errors?.map((e) => e.message).join('\n') ?? 'unknown'
  );
  return Promise.reject(error);
};
