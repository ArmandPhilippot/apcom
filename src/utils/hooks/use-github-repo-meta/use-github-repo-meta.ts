import useSWR from 'swr';
import {
  type FetchGithubRepoMetaInput,
  fetchGithubRepoMeta,
} from '../../../services/github';
import type { GithubRepositoryMeta, Maybe } from '../../../types';

export type UseGithubRepoMetaReturn<T extends Maybe<GithubRepositoryMeta>> = {
  isError: boolean;
  isLoading: boolean;
  isValidating: boolean;
  meta: T extends undefined
    ? Maybe<GithubRepositoryMeta>
    : GithubRepositoryMeta;
};

export const useGithubRepoMeta = <T extends Maybe<GithubRepositoryMeta>>(
  input: FetchGithubRepoMetaInput,
  fallback?: T
) => {
  const { data, error, isLoading, isValidating } = useSWR(
    input,
    fetchGithubRepoMeta,
    {
      fallbackData: fallback,
    }
  );

  if (error) console.error(error);

  return {
    isError: !!error,
    isLoading,
    isValidating,
    meta: data,
  } as UseGithubRepoMetaReturn<T>;
};
