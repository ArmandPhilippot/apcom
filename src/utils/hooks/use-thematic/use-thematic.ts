import useSWR from 'swr';
import {
  convertWPThematicToThematic,
  fetchThematic,
} from '../../../services/graphql';
import type { Maybe, Thematic, WPThematic } from '../../../types';

export type UseThematicReturn<T extends Maybe<WPThematic>> = {
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  thematic: T extends undefined ? Maybe<Thematic> : Thematic;
};

export const useThematic = <T extends Maybe<WPThematic>>(
  slug: string,
  fallback?: T
): UseThematicReturn<T> => {
  const { data, error, isLoading, isValidating } = useSWR(slug, fetchThematic, {
    fallbackData: fallback,
  });

  if (error) console.error(error);

  return {
    isError: !!error,
    isLoading,
    isValidating,
    thematic: data ? convertWPThematicToThematic(data) : undefined,
  } as UseThematicReturn<T>;
};
