export type CommentAuthor = {
  gravatarUrl: string;
  name: string;
  url: string;
};

export type CommentAuthorResponse = {
  node: CommentAuthor;
};

export type Comment = {
  approved: '';
  author: CommentAuthor;
  commentId: number;
  content: string;
  date: string;
  id: string;
  parentDatabaseId: number;
  replies: Comment[];
};

export type RawComment = Omit<Comment, 'author'> & {
  author: CommentAuthorResponse;
};

export type CommentsResponse = {
  nodes: RawComment[];
};

export type CreatedComment = {
  clientMutationId: string;
  success: boolean;
  comment: null | {
    approved: boolean;
  };
};

export type CreatedCommentResponse = {
  createComment: CreatedComment;
};

export type CreatedCommentReturn = (
  author: string,
  authorEmail: string,
  authorUrl: string,
  content: string,
  parent: number,
  commentOn: number,
  mutationId: string
) => Promise<CreatedComment>;
