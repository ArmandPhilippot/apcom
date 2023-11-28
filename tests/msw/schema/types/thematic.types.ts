export const thematicTypes = `enum ThematicIdType {
  DATABASE_ID
  ID
  SLUG
  URI
}

union Thematic_Acfthematics_PostsInThematic = Post

type Thematic_Acfthematics {
  postsInThematic: [Thematic_Acfthematics_PostsInThematic]
}

type Thematic {
  acfThematics: Thematic_Acfthematics
  contentParts: ContentPartsType
  databaseId: Int!
  date: String
  featuredImage: NodeWithFeaturedImageToMediaItemConnectionEdge
  info: InfoType
  modified: String
  seo: PostTypeSEO
  slug: String
  title(format: PostObjectFieldFormatEnum): String
}

input RootQueryToThematicConnectionWhereArgs {
  authorName: String
  orderby: [PostObjectsConnectionOrderbyInput]
  search: String
  title: String
}

type RootQueryToThematicConnectionPageInfo {
  endCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  total: Int
}

type RootQueryToThematicConnectionEdge {
  cursor: String
  node: Thematic!
}

type RootQueryToThematicConnection {
  edges: [RootQueryToThematicConnectionEdge!]!
  nodes: [Thematic!]!
  pageInfo: RootQueryToThematicConnectionPageInfo!
}`;

// cSpell:ignore Acfthematics
