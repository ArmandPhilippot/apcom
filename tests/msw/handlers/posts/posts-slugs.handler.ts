import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { PostsSlugsResponse } from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const postsSlugsHandler = graphql.query<
  PostsSlugsResponse,
  Record<'first', number>
>('PostsSlugs', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { posts: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      posts: { nodes: wpPostsFixture },
    },
  })) as ExecutionResult<PostsSlugsResponse>;

  return HttpResponse.json({ data, errors });
});
