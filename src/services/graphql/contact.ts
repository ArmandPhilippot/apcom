import { SendMailReturn, SentEmailResponse } from '@ts/types/contact';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

export const sendMail: SendMailReturn = async (
  subject: string,
  body: string,
  replyTo: string,
  mutationId: string
) => {
  const client = getGraphQLClient();
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

  const variables = { subject, body, replyTo, mutationId };

  try {
    const response: SentEmailResponse = await client.request(
      mutation,
      variables
    );
    return response.sendEmail;
  } catch (error) {
    console.error(error, undefined, 2);
    process.exit(1);
  }
};
