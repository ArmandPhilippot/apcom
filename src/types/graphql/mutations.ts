import { sendCommentMutation, sendMailMutation } from '../../services/graphql';

//===========================================================================
// Existing mutations list
//===========================================================================

export type Mutations = typeof sendMailMutation | typeof sendCommentMutation;

//===========================================================================
// Mutations response types
//===========================================================================

export type SendCommentResponse<T> = {
  createComment: T;
};

export type SendMailResponse<T> = {
  sendEmail: T;
};

export type MutationsResponseMap<T> = {
  [sendCommentMutation]: SendCommentResponse<T>;
  [sendMailMutation]: SendMailResponse<T>;
};

export type Approved = {
  approved: boolean;
};

export type SentComment = {
  clientMutationId: string;
  success: boolean;
  comment: Approved | null;
};

//===========================================================================
// Mutations input types
//===========================================================================

export type SendCommentInput = {
  author: string;
  authorEmail: string;
  authorUrl: string;
  clientMutationId: string;
  commentOn: number;
  content: string;
  parent?: number;
};

export type SendMailInput = {
  body: string;
  clientMutationId: string;
  replyTo: string;
  subject: string;
};

export type MutationsInputMap = {
  [sendCommentMutation]: SendCommentInput;
  [sendMailMutation]: SendMailInput;
};
