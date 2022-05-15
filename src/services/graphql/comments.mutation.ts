/**
 * Send comment mutation.
 */
export const sendCommentMutation = `mutation CreateComment(
  $author: String!
  $authorEmail: String!
  $authorUrl: String!
  $content: String!
  $parent: ID = null
  $commentOn: Int!
  $clientMutationId: String!
) {
  createComment(
    input: {
      author: $author
      authorEmail: $authorEmail
      authorUrl: $authorUrl
      content: $content
      parent: $parent
      commentOn: $commentOn
      clientMutationId: $clientMutationId
    }
  ) {
    clientMutationId
    success
    comment {
      approved
    }
  }
}`;
