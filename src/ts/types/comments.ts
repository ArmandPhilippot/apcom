//==============================================================================
// Comments query
//==============================================================================

export type CommentAuthor = {
  name: string;
  gravatarUrl: string;
  url: string;
};

export type RawCommentAuthor = {
  node: CommentAuthor;
};

export type Comment = {
  approved: '';
  author: CommentAuthor;
  databaseId: number;
  content: string;
  date: string;
  parentDatabaseId: number;
  replies: Comment[];
};

export type RawComment = Omit<Comment, 'author' | 'replies'> & {
  author: RawCommentAuthor;
};

export type CommentsNode = {
  nodes: RawComment[];
};

export type CommentsByPostId = {
  comments: CommentsNode;
};

//==============================================================================
// Comment mutations
//==============================================================================

export type CommentData = {
  author: string;
  authorEmail: string;
  authorUrl: string;
  content: string;
  parent: number;
  commentOn: number;
  mutationId: string;
};

export type CreatedComment = {
  clientMutationId: string;
  success: boolean;
  comment: null | {
    approved: boolean;
  };
};

export type CreateComment = {
  createComment: CreatedComment;
};
