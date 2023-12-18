import useSWR from 'swr';
import {
  type FetchGithubRepoMetaInput,
  fetchGithubRepoMeta,
} from '../../../services/github';
import type { GithubRepositoryMeta, Maybe, Nullable } from '../../../types';

export type UseGithubRepoMetaReturn<
  I extends Nullable<FetchGithubRepoMetaInput>,
  T extends Maybe<GithubRepositoryMeta>,
> = {
  isError: I extends null ? false : boolean;
  isLoading: I extends null ? false : boolean;
  isValidating: I extends null ? false : boolean;
  meta: I extends null
    ? null
    : T extends undefined
      ? Maybe<GithubRepositoryMeta>
      : GithubRepositoryMeta;
};

export const useGithubRepoMeta = <
  I extends Nullable<FetchGithubRepoMetaInput>,
  T extends Maybe<GithubRepositoryMeta>,
>(
  input: I,
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
    isLoading: input !== null && isLoading && !data,
    isValidating,
    meta: data,
  } as UseGithubRepoMetaReturn<I, T>;
};
