import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { PostResponse } from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const postHandler = graphql.query<PostResponse, Record<'slug', string>>(
  'Post',
  async ({ query, variables }) => {
    const { data, errors } = (await executeGraphql({
      schema,
      source: query,
      variableValues: variables,
      rootValue: {
        post: wpPostsFixture.find((wpPost) => wpPost.slug === variables.slug),
      },
    })) as ExecutionResult<PostResponse>;

    return HttpResponse.json({ data, errors });
  }
);
