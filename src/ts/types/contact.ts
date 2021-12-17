export type SentEmail = {
  clientMutationId: string;
  message: string;
  origin: string;
  replyTo: string;
  sent: boolean;
  to: string;
};

export type SentEmailResponse = {
  sendEmail: SentEmail;
};

export type SendMailReturn = (
  subject: string,
  body: string,
  replyTo: string,
  mutationId: string
) => Promise<SentEmail>;
