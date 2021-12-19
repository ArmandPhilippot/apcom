export type ContactData = {
  body: string;
  mutationId: string;
  replyTo: string;
  subject: string;
};

export type SentEmail = {
  clientMutationId: string;
  message: string;
  origin: string;
  replyTo: string;
  sent: boolean;
  to: string;
};

export type SendEmail = {
  sendEmail: SentEmail;
};
