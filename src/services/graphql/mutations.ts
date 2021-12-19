import { CommentData, CreateComment, CreatedComment } from '@ts/types/comments';
import { ContactData, SendEmail } from '@ts/types/contact';
import { gql } from 'graphql-request';
import { fetchApi } from './api';

//==============================================================================
// Comment mutation
//==============================================================================

export const createComment = async (
  data: CommentData
): Promise<CreatedComment> => {
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

  const variables = { ...data };
  const response = await fetchApi<CreateComment>(mutation, variables);

  return response.createComment;
};

//==============================================================================
// Contact mutation
//==============================================================================

export const sendMail = async (data: ContactData) => {
  const mutation = gql`
    mutation SendEmail(
      $subject: String!
      $body: String!
      $replyTo: String!
      $mutationId: String!
    ) {
      sendEmail(
        input: {
          clientMutationId: $mutationId
          body: $body
          replyTo: $replyTo
          subject: $subject
        }
      ) {
        clientMutationId
        message
        sent
        origin
        replyTo
        to
      }
    }
  `;

  const variables = { ...data };
  const response = await fetchApi<SendEmail>(mutation, variables);
  return response.sendEmail;
};
