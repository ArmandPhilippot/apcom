import { type ExecutionResult, graphql as executeGraphql } from 'graphql';
import { HttpResponse, graphql } from 'msw';
import type {
  FetchCommentsListInput,
  CommentsListResponse,
} from '../../../../src/services/graphql';
import { wpCommentsFixture } from '../../../fixtures';
import { schema } from '../../schema';

export const commentsListHandler = graphql.query<
  CommentsListResponse,
  FetchCommentsListInput
>('CommentsList', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError) return HttpResponse.json({ data: { comments: null } });

  const { data, errors } = (await executeGraphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      comments({ first, where }: typeof variables) {
        const { status: commentStatus } = where ?? {};
        const filteredComments = commentStatus
          ? wpCommentsFixture.filter(
              (comment) => comment.status === commentStatus
            )
          : wpCommentsFixture;
        const comments = filteredComments.slice(0, first);

        return { nodes: comments };
      },
    },
  })) as ExecutionResult<CommentsListResponse>;

  return HttpResponse.json({ data, errors });
});
