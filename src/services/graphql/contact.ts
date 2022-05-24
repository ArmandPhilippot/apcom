import { fetchAPI, getAPIUrl, SendMailVars } from './api';
import { sendMailMutation } from './contact.mutation';

export type SentEmail = {
  clientMutationId: string;
  message: string;
  origin: string;
  replyTo: string;
  sent: boolean;
};

/**
 * Send an email using GraphQL API.
 *
 * @param {sendMailVars} data - The mail data.
 * @returns {Promise<SentEmail>} The mutation response.
 */
export const sendMail = async (data: SendMailVars): Promise<SentEmail> => {
  const response = await fetchAPI<SentEmail, typeof sendMailMutation>({
    api: getAPIUrl(),
    query: sendMailMutation,
    variables: { ...data },
  });

  return response.sendEmail;
};
