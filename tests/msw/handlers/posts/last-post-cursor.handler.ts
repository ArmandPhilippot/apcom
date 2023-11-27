import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { LastPostCursorResponse } from '../../../../src/services/graphql';
import { wpPostsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const lastPostCursorHandler = graphql.query<
  LastPostCursorResponse,
  Record<'first', number>
>('LastPostCursor', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { posts: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      posts({ first }: typeof variables) {
        return getConnection({
          after: null,
          data: wpPostsFixture,
          first,
        });
      },
    },
  })) as ExecutionResult<LastPostCursorResponse>;

  return HttpResponse.json({ data, errors });
});
