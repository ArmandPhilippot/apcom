export const topicTypes = `enum TopicIdType {
  DATABASE_ID
  ID
  SLUG
  URI
}

union Topic_Acftopics_PostsInTopic = Post

type Topic_Acftopics {
  officialWebsite: String
  postsInTopic: [Topic_Acftopics_PostsInTopic]
}

type Topic {
  acfTopics: Topic_Acftopics
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

input RootQueryToTopicConnectionWhereArgs {
  authorName: String
  orderby: [PostObjectsConnectionOrderbyInput]
  search: String
  title: String
}

type RootQueryToTopicConnectionPageInfo {
  endCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  total: Int
}

type RootQueryToTopicConnectionEdge {
  cursor: String
  node: Topic!
}

type RootQueryToTopicConnection {
  edges: [RootQueryToTopicConnectionEdge!]!
  nodes: [Topic!]!
  pageInfo: RootQueryToTopicConnectionPageInfo!
}`;

// cSpell:ignore Acftopics
