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
