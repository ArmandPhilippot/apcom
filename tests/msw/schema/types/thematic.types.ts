export const thematicTypes = `union Thematic_Acfthematics_PostsInThematic = Post

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
}`;

// cSpell:ignore Acfthematics
