import { fetchGraphQL, getGraphQLUrl } from 'src/utils/helpers';

type SentEmail = {
  clientMutationId: string;
  message: string;
  origin: string;
  replyTo: string;
  sent: boolean;
};

type SendEmailResponse = {
  sendEmail: SentEmail;
};

const sendMailMutation = `mutation SendEmail($body: String, $clientMutationId: String, $replyTo: String, $subject: String) {
  sendEmail(
    input: {body: $body, clientMutationId: $clientMutationId, replyTo: $replyTo, subject: $subject}
  ) {
    clientMutationId
    message
    origin
    replyTo
    sent
    to
  }
}`;

export type SendMailInput = {
  body: string;
  clientMutationId: string;
  replyTo: string;
  subject: string;
};

/**
 * Send an email using GraphQL API.
 *
 * @param {SendMailInput} data - The mail data.
 * @returns {Promise<SentEmail>} The mutation response.
 */
export const sendMail = async (data: SendMailInput): Promise<SentEmail> => {
  const response = await fetchGraphQL<SendEmailResponse>({
    query: sendMailMutation,
    url: getGraphQLUrl(),
    variables: { ...data },
  });

  return response.sendEmail;
};
