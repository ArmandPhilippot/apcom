export const authorTypes = `enum AvatarRatingEnum {
  G
  PG
  R
  X
}

type Avatar {
  height: Int
  url: String
  width: Int
}

type User {
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
