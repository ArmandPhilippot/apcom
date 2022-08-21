/**
 * Query the comments data by post id.
 */
export const commentsQuery = `query CommentsByPostId($contentId: ID!, $first: Int = 10, $after: String = "") {
  comments(
    where: {contentId: $contentId}
    first: $first
    after: $after
  ) {
    edges {
      cursor
      node {
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
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
