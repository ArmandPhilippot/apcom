export const postTypes = `union Post_Acfposts_PostsInThematic = Thematic

union Post_Acfposts_PostsInTopic = Topic

type Post_Acfposts {
  postsInThematic: [Post_Acfposts_PostsInThematic]
  postsInTopic: [Post_Acfposts_PostsInTopic]
}

type Post {
  acfPosts: Post_Acfposts
  author: NodeWithAuthorToUserConnectionEdge
  commentCount: Int
  contentParts: ContentPartsType
  databaseId: Int!
  date: String
  featuredImage: NodeWithFeaturedImageToMediaItemConnectionEdge
  info: InfoType
  modified: String!
  seo: PostTypeSEO
  slug: String
  title(format: PostObjectFieldFormatEnum): String
}

enum PostStatusEnum {
  ACF_DISABLED
  AUTO_DRAFT
  DRAFT
  FUTURE
  INHERIT
  PENDING
  PRIVATE
  PUBLISH
  REQUEST_COMPLETED
  REQUEST_CONFIRMED
  REQUEST_FAILED
  REQUEST_PENDING
  TRASH
}

input PostObjectsConnectionOrderbyInput {
  field: PostObjectsConnectionOrderbyEnum!
  order: OrderEnum!
}

input RootQueryToPostConnectionWhereArgs {
  authorName: String
  orderby: [PostObjectsConnectionOrderbyInput]
  search: String
  status: PostStatusEnum
  title: String
}

type RootQueryToPostConnectionEdge {
  cursor: String
  node: Post!
}

type RootQueryToPostConnectionPageInfo {
  endCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  total: Int
}

type RootQueryToPostConnection {
  edges: [RootQueryToPostConnectionEdge!]!
  pageInfo: RootQueryToPostConnectionPageInfo!
}`;

// cSpell:ignore Acfposts
