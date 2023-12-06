import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { PostResponse } from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const postHandler = wordpressAPI.query<
  PostResponse,
  Record<'slug', string>
>('Post', async ({ query, variables }) => {
  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      post: wpPostsFixture.find((wpPost) => wpPost.slug === variables.slug),
    },
  })) as ExecutionResult<PostResponse>;

  return HttpResponse.json({ data, errors });
});
