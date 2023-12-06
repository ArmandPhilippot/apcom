import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { TopicsSlugsResponse } from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const topicsSlugsHandler = wordpressAPI.query<
  TopicsSlugsResponse,
  Record<'first', number>
>('TopicsSlugs', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { topics: null } });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topics: { nodes: wpTopicsFixture },
    },
  })) as ExecutionResult<TopicsSlugsResponse>;

  return HttpResponse.json({ data, errors });
});
