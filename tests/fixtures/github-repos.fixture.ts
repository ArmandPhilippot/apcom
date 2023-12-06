import type { GithubRepositoryMeta } from '../../src/types';

type GithubRepository = GithubRepositoryMeta & {
  name: string;
  owner: string;
};

export const githubRepos = [
  {
    createdAt: '2020-09-26',
    name: 'laborum',
    owner: 'Dion',
    stargazerCount: 8,
    updatedAt: '2023-05-05',
  },
  {
    createdAt: '2020-10-30',
    name: 'quo',
    owner: 'Brennan',
    stargazerCount: 0,
    updatedAt: '2022-03-01',
  },
  {
    createdAt: '2021-11-16',
    name: 'soluta',
    owner: 'Alex',
    stargazerCount: 8,
    updatedAt: '2023-08-10',
  },
] satisfies GithubRepository[];
