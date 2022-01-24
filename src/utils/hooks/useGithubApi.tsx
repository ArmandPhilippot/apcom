import { RepoData } from '@ts/types/repos';
import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher<RepoData, string> = (...args) =>
  fetch(...args).then((res) => res.json());

/**
 * Retrieve data from Github API.
 * @param repo The repo name. Format: "User/project-slug".
 * @returns {object} The data and two booleans to determine if is loading/error.
 */
const useGithubApi = (repo: string) => {
  const apiUrl = repo ? `https://api.github.com/repos/${repo}` : null;
  const { data, error } = useSWR<RepoData>(apiUrl, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useGithubApi;
