import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { TopicsSlugsResponse } from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const topicsSlugsHandler = graphql.query<
  TopicsSlugsResponse,
  Record<'first', number>
>('TopicsSlugs', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { topics: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topics: { nodes: wpTopicsFixture },
    },
  })) as ExecutionResult<TopicsSlugsResponse>;

  return HttpResponse.json({ data, errors });
});
