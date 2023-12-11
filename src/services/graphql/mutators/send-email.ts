import type { Nullable } from '../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../utils/helpers';

export type SendEmail = {
  clientMutationId: Nullable<string>;
  message: string;
  origin: string;
  replyTo: string;
  sent: boolean;
};

export type SendEmailResponse = {
  sendEmail: SendEmail;
};

const sendEmailMutation = `mutation SendEmail($input: SendEmailInput!) {
  sendEmail(input: $input) {
    clientMutationId
    message
    origin
    replyTo
    sent
    to
  }
}`;

export type SendEmailInput = {
  body: string;
  clientMutationId: string;
  replyTo: string;
  subject?: string;
};

/**
 * Send an email using GraphQL API.
 *
 * @param {SendEmailInput} input - The mail input.
 * @returns {Promise<SendEmail>} The mutation response.
 */
export const sendEmail = async (input: SendEmailInput): Promise<SendEmail> => {
  const response = await fetchGraphQL<SendEmailResponse>({
    query: sendEmailMutation,
    url: getGraphQLUrl(),
    variables: { input },
  });

  return response.sendEmail;
};
