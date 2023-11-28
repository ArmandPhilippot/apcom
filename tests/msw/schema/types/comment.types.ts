export const commentTypes = `enum CommentsConnectionOrderbyEnum {
  COMMENT_AGENT
  COMMENT_APPROVED
  COMMENT_AUTHOR
  COMMENT_AUTHOR_EMAIL
  COMMENT_AUTHOR_IP
  COMMENT_AUTHOR_URL
  COMMENT_CONTENT
  COMMENT_DATE
  COMMENT_DATE_GMT
  COMMENT_ID
  COMMENT_IN
  COMMENT_KARMA
  COMMENT_PARENT
  COMMENT_POST_ID
  COMMENT_TYPE
  USER_ID
}

type Commenter {
  avatar: Avatar
  name: String
  url: String
}

type CommentToCommenterConnectionEdge {
  cursor: String
  node: Commenter!
}

enum CommentStatusEnum {
  APPROVE
  HOLD
  SPAM
  TRASH
}

type Comment {
  approved: Boolean
  author: CommentToCommenterConnectionEdge
  content(format: PostObjectFieldFormatEnum): String
  databaseId: Int!
  date: String
  parentDatabaseId: Int
  status: CommentStatusEnum
}

input RootQueryToCommentConnectionWhereArgs {
  contentId: ID
  contentName: String
  order: OrderEnum
  orderby: CommentsConnectionOrderbyEnum
  parent: Int
  status: String
}

type RootQueryToCommentConnectionPageInfo {
  endCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  total: Int
}

type RootQueryToCommentConnectionEdge {
  cursor: String
  node: Comment!
}

type RootQueryToCommentConnection {
  edges: [RootQueryToCommentConnectionEdge!]!
  nodes: [Comment!]!
  pageInfo: RootQueryToCommentConnectionPageInfo!
}`;
