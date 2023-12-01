import useSWR from 'swr';
import {
  type FetchTopicsListInput,
  fetchTopicsList,
} from '../../../services/graphql';
import type { GraphQLConnection, Maybe, WPTopicPreview } from '../../../types';

export type UseTopicsListReturn<
  T extends Maybe<GraphQLConnection<WPTopicPreview>>,
> = {
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  topics: T extends undefined
    ? Maybe<GraphQLConnection<WPTopicPreview>>
    : GraphQLConnection<WPTopicPreview>;
};

export type UseTopicsListConfig<
  T extends Maybe<GraphQLConnection<WPTopicPreview>>,
> = {
  input?: FetchTopicsListInput;
  fallback?: T;
};

export const useTopicsList = <
  T extends Maybe<GraphQLConnection<WPTopicPreview>>,
>(
  config?: UseTopicsListConfig<T>
): UseTopicsListReturn<T> => {
  const { fallback, input } = config ?? {};
  const { data, error, isLoading, isValidating } = useSWR(
    input ?? {},
    fetchTopicsList,
    { fallbackData: fallback }
  );

  if (error) console.error(error);

  return {
    isError: !!error,
    isLoading,
    isValidating,
    topics: data,
  } as UseTopicsListReturn<T>;
};
