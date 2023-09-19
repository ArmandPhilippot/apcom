import useSWR, { Fetcher } from 'swr';
import { SWRResult } from '../../types/swr';

export type RepoData = {
  created_at: string;
  updated_at: string;
  stargazers_count: number;
};

const fetcher: Fetcher<RepoData, string> = (...args) =>
  fetch(...args).then((res) => res.json());

/**
 * Retrieve data from Github API.
 *
 * @param repo - The Github repo (`owner/repo-name`).
 * @returns The repository data.
 */
const useGithubApi = (repo: string): SWRResult<RepoData> => {
  const apiUrl = repo ? `https://api.github.com/repos/${repo}` : null;
  const { data, error } = useSWR<RepoData>(apiUrl, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGithubApi;
