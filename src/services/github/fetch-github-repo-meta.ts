import type { GithubRepositoryMeta, Nullable } from '../../types';
import { GITHUB_API } from '../../utils/constants';
import { fetchGraphQL } from '../../utils/helpers';

export type GithubRepositoryResponse = {
  repository: Nullable<GithubRepositoryMeta>;
};

const githubRepoQuery = `query GithubRepository($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    createdAt
    stargazerCount
    updatedAt
  }
}`;

export type FetchGithubRepoMetaInput = {
  name: string;
  owner: string;
};

export const fetchGithubRepoMeta = async ({
  name,
  owner,
}: FetchGithubRepoMetaInput) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) throw new Error('Github token is not defined.');

  const response = await fetchGraphQL<GithubRepositoryResponse>({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    query: githubRepoQuery,
    url: GITHUB_API,
    variables: { name, owner },
  });

  if (!response.repository)
    return Promise.reject(
      new Error(`No data found for the following repository ${owner}/${name}.`)
    );

  return response.repository;
};
