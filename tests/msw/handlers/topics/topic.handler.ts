import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { TopicResponse } from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const topicHandler = wordpressAPI.query<
  TopicResponse,
  Record<'slug', string>
>('Topic', async ({ query, variables }) => {
  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topic: wpTopicsFixture.find((wpTopic) => wpTopic.slug === variables.slug),
    },
  })) as ExecutionResult<TopicResponse>;

  return HttpResponse.json({ data, errors });
});
