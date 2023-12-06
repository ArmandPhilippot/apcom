import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type { TopicsCountResponse } from '../../../../src/services/graphql';
import type { GraphQLPostWhere } from '../../../../src/types';
import { wpTopicsFixture } from '../../../fixtures';
import { getConnection } from '../../../utils/graphql';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const topicsCountHandler = wordpressAPI.query<
  TopicsCountResponse,
  GraphQLPostWhere
>('TopicsCount', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { topics: null } });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      topics({ search, title }: typeof variables) {
        const filteredTopicsByTitle = title
          ? wpTopicsFixture.filter((topic) => topic.title.includes(title))
          : wpTopicsFixture;
        const filteredTopics = search
          ? filteredTopicsByTitle.filter((topic) =>
              topic.title.includes(search)
            )
          : filteredTopicsByTitle;

        return getConnection({
          after: null,
          data: filteredTopics,
          first: undefined,
        });
      },
    },
  })) as ExecutionResult<TopicsCountResponse>;

  return HttpResponse.json({ data, errors });
});
