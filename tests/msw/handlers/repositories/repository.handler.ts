import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type {
  FetchGithubRepoMetaInput,
  GithubRepositoryResponse,
} from '../../../../src/services/github';
import { githubRepos } from '../../../fixtures';
import { githubAPI } from '../../instances';
import { githubSchema } from '../../schema';

export const repositoryHandler = githubAPI.query<
  GithubRepositoryResponse,
  FetchGithubRepoMetaInput
>('GithubRepository', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { repository: null } });

  const { data, errors } = (await graphql({
    schema: githubSchema,
    source: query,
    variableValues: variables,
    rootValue: {
      repository: githubRepos.find(
        (repo) => repo.owner === variables.owner && repo.name === variables.name
      ),
    },
  })) as ExecutionResult<GithubRepositoryResponse>;

  return HttpResponse.json({ data, errors });
});
