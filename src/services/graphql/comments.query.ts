/**
 * Query the comments data by post id.
 */
export const commentsQuery = `query CommentsByPostId($contentId: ID!) {
  comments(where: {contentId: $contentId, order: ASC, orderby: COMMENT_DATE}) {
    nodes {
      approved
      author {
        node {
          gravatarUrl
          name
          url
        }
      }
      content
      databaseId
      date
      parentDatabaseId
    }
  }
}`;
