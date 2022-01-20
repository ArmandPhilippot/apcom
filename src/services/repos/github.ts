import { RepoData } from '@ts/types/github';

/**
 * Retrieve repository data from Github by slug.
 * @param repo - The repository slug.
 * @returns {Promise<RepoData>} - The repository data.
 */
export const getRepoData = async (repo: string): Promise<RepoData> => {
  const user = process.env.NEXT_PUBLIC_GITHUB_USER;
  const api = `https://api.github.com/repos/${user}/${repo}`;

  const response = await fetch(api);

  return response.json();
};
