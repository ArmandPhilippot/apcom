import { type ExecutionResult, graphql } from 'graphql';
import { HttpResponse } from 'msw';
import type {
  CreateCommentInput,
  CreateCommentPayload,
  CreateCommentResponse,
} from '../../../../src/services/graphql';
import { wordpressAPI } from '../../instances';
import { schema } from '../../schema';

export const createCommentHandler = wordpressAPI.mutation<
  CreateCommentResponse,
  Record<'input', CreateCommentInput>
>('CreateComment', async ({ query, variables }) => {
  const pageParams = new URLSearchParams(window.location.search);
  const isError = pageParams.get('error') === 'true';

  if (isError)
    return HttpResponse.json({
      data: {
        createComment: {
          clientMutationId: null,
          comment: null,
          success: false,
        },
      },
    });

  const { data, errors } = (await graphql({
    schema,
    source: query,
    variableValues: variables,
    rootValue: {
      createComment({ input }: typeof variables): CreateCommentPayload {
        const { clientMutationId } = input;

        return {
          clientMutationId,
          comment: {
            approved: true,
          },
          success: true,
        };
      },
    },
  })) as ExecutionResult<CreateCommentResponse>;

  return HttpResponse.json({ data, errors });
});
