import type { Nullable } from '../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../utils/helpers';

type CreatedComment = {
  clientMutationId: string;
  success: boolean;
  comment: Nullable<{
    approved: boolean;
  }>;
};

type CreateCommentResponse = {
  createComment: CreatedComment;
};

export const createCommentMutation = `mutation CreateComment(
  $author: String!
  $authorEmail: String!
  $authorUrl: String!
  $content: String!
  $parent: ID = null
  $commentOn: Int!
  $clientMutationId: String!
) {
  createComment(
    input: {
      author: $author
      authorEmail: $authorEmail
      authorUrl: $authorUrl
      content: $content
      parent: $parent
      commentOn: $commentOn
      clientMutationId: $clientMutationId
    }
  ) {
    clientMutationId
    success
    comment {
      approved
    }
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
 * @returns {Promise<CreatedComment>} The created comment.
 */
export const createComment = async (
  input: CreateCommentInput
): Promise<CreatedComment> => {
  const response = await fetchGraphQL<CreateCommentResponse>({
    query: createCommentMutation,
    url: getGraphQLUrl(),
    variables: { ...input },
  });

  return response.createComment;
};
