import {
  CreatedCommentResponse,
  CreatedCommentReturn,
} from '@ts/types/comments';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

export const createComment: CreatedCommentReturn = async (
  author: string,
  authorEmail: string,
  authorUrl: string,
  content: string,
  parent: number,
  commentOn: number,
  mutationId: string
) => {
  const client = getGraphQLClient();
  const mutation = gql`
    mutation CreateComment(
      $author: String!
      $authorEmail: String!
      $authorUrl: String!
      $content: String!
      $parent: ID!
      $commentOn: Int!
      $mutationId: String!
    ) {
      createComment(
        input: {
          author: $author
          authorEmail: $authorEmail
          authorUrl: $authorUrl
          content: $content
          parent: $parent
          commentOn: $commentOn
          clientMutationId: $mutationId
        }
      ) {
        clientMutationId
        success
        comment {
          approved
        }
      }
    }
  `;

  const variables = {
    author,
    authorEmail,
    authorUrl,
    content,
    parent,
    commentOn,
    mutationId,
  };

  try {
    const response: CreatedCommentResponse = await client.request(
      mutation,
      variables
    );
    return response.createComment;
  } catch (error) {
    console.error(error, undefined, 2);
    throw new Error(`An uncaught exception has occurred: ${error}`);
  }
};
