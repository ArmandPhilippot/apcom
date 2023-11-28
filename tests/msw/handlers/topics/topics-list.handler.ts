import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type {
  FetchTopicsListInput,
  TopicsListResponse,
} from '../../../../src/services/graphql';
import { wpTopicsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { schema } from '../../schema';

export const topicsListHandler = graphql.query<
  TopicsListResponse,
  FetchTopicsListInput
>('TopicsList', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { topics: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topics({ after, first, where }: typeof variables) {
        const { search, title } = where ?? {};
        const filteredTopicsByTitle = title
          ? wpTopicsFixture.filter((topic) => topic.title.includes(title))
          : wpTopicsFixture;
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
