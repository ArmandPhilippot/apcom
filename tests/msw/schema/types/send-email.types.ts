export const sendEmailTypes = `input SendEmailInput {
  body: String
  clientMutationId: String
  from: String
  replyTo: String
  subject: String
  to: String
}

type SendEmailPayload {
  clientMutationId: String
  message: String
  origin: String
  replyTo: String
  sent: Boolean
  to: String
}`;
