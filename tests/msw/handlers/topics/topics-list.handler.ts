import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type {
  FetchTopicsListInput,
  TopicsListResponse,
} from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const topicsListHandler = wordpressAPI.query<
  TopicsListResponse,
  FetchTopicsListInput
>('TopicsList', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { topics: null } });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topics({ after, first, where }: typeof variables) {
        const { notIn, search, title } = where ?? {};
        const filteredTopicsById = notIn
          ? wpTopicsFixture.filter((topic) => !notIn.includes(topic.databaseId))
          : wpTopicsFixture;
        const filteredTopicsByTitle = title
          ? filteredTopicsById.filter((topic) => topic.title.includes(title))
          : filteredTopicsById;
        const filteredTopics = search
          ? filteredTopicsByTitle.filter((topic) =>
              topic.title.includes(search)
            )
          : filteredTopicsByTitle;

        return getConnection({ after, data: filteredTopics, first });
      },
    },
  })) as ExecutionResult<TopicsListResponse>;

  return HttpResponse.json({ data, errors });
});
