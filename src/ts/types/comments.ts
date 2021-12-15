export type CommentAuthor = {
  gravatarUrl: string;
  name: string;
  url: string;
};

export type Comment = {
  approved: '';
  author: CommentAuthor;
  commentId: number;
  content: string;
  date: string;
  id: string;
};

export type CommentsResponse = {
  nodes: Comment[];
};
