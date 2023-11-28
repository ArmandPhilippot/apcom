export const authorTypes = `type User {
  avatar(
    forceDefault: Boolean
    rating: AvatarRatingEnum
    size: Int = 96
  ): Avatar
  databaseId: Int!
  name: String
  url: String
}
type NodeWithAuthorToUserConnectionEdge {
  node: User!
}`;
