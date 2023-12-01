import useSWR from 'swr';
import {
  type FetchThematicsListInput,
  fetchThematicsList,
} from '../../../services/graphql';
import type {
  GraphQLConnection,
  Maybe,
  WPThematicPreview,
} from '../../../types';

export type UseThematicsListReturn<
  T extends Maybe<GraphQLConnection<WPThematicPreview>>,
> = {
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  thematics: T extends undefined
    ? Maybe<GraphQLConnection<WPThematicPreview>>
    : GraphQLConnection<WPThematicPreview>;
};

export type UseThematicsListConfig<
  T extends Maybe<GraphQLConnection<WPThematicPreview>>,
> = {
  input?: FetchThematicsListInput;
  fallback?: T;
};

export const useThematicsList = <
  T extends Maybe<GraphQLConnection<WPThematicPreview>>,
>(
  config?: UseThematicsListConfig<T>
): UseThematicsListReturn<T> => {
  const { fallback, input } = config ?? {};
  const { data, error, isLoading, isValidating } = useSWR(
    input ?? {},
    fetchThematicsList,
    { fallbackData: fallback }
  );

  if (error) console.error(error);

  return {
    isError: !!error,
    isLoading,
    isValidating,
    thematics: data,
  } as UseThematicsListReturn<T>;
};
