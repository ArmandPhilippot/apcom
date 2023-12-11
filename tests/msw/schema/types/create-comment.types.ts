export const createCommentTypes = `input CreateCommentInput {
  approved: String
  author: String
  authorEmail: String
  authorUrl: String
  clientMutationId: String
  commentOn: Int
  content: String
  date: String
  parent: ID
  status: CommentStatusEnum
  type: String
}

type CreateCommentPayload {
  clientMutationId: String
  comment: Comment
  success: Boolean
}`;
