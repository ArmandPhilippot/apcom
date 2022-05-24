/**
 * Send mail mutation.
 */
export const sendMailMutation = `mutation SendEmail(
  $subject: String!
  $body: String!
  $replyTo: String!
  $clientMutationId: String!
) {
  sendEmail(
    input: {
      clientMutationId: $clientMutationId
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
}`;
