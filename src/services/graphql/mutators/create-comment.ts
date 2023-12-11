import type { Nullable, WPComment } from '../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../utils/helpers';

export type CreateCommentPayload = {
  clientMutationId: Nullable<string>;
  success: boolean;
  comment: Nullable<Pick<WPComment, 'approved'>>;
};

export type CreateCommentResponse = {
  createComment: CreateCommentPayload;
};

export const createCommentMutation = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    clientMutationId
    comment {
      approved
    }
    success
  }
}`;

export type CreateCommentInput = {
  author: string;
  authorEmail: string;
  authorUrl: string;
  clientMutationId: string;
  commentOn: number;
  content: string;
  parent?: number;
};

/**
 * Create a new comment using GraphQL API.
 *
 * @param {CreateCommentInput} input - The comment data.
 * @returns {Promise<CreateCommentPayload>} The created comment.
 */
export const createComment = async (
  input: CreateCommentInput
): Promise<CreateCommentPayload> => {
  const response = await fetchGraphQL<CreateCommentResponse>({
    query: createCommentMutation,
    url: getGraphQLUrl(),
    variables: { input },
  });

  return response.createComment;
};
