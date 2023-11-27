export const topicTypes = `union Topic_Acftopics_PostsInTopic = Post

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
}`;

// cSpell:ignore Acftopics
