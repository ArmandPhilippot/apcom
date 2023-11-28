import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type { TopicResponse } from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const topicHandler = graphql.query<
  TopicResponse,
  Record<'slug', string>
>('Topic', async ({ query, variables }) => {
  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topic: wpTopicsFixture.find((wpTopic) => wpTopic.slug === variables.slug),
    },
  })) as ExecutionResult<TopicResponse>;

  return HttpResponse.json({ data, errors });
});
