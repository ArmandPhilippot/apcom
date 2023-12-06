import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { PostsSlugsResponse } from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const postsSlugsHandler = wordpressAPI.query<
  PostsSlugsResponse,
  Record<'first', number>
>('PostsSlugs', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { posts: null } });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      posts: { nodes: wpPostsFixture },
    },
  })) as ExecutionResult<PostsSlugsResponse>;

  return HttpResponse.json({ data, errors });
});
