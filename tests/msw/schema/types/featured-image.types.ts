export const featuredImageTypes = `type MediaDetails {
  height: Int
  width: Int
}

enum MediaItemSizeEnum {
  LARGE
  MEDIUM
  MEDIUM_LARGE
  THUMBNAIL
  _1536X1536
  _2048X2048
}

type MediaItem {
  altText: String
  mediaDetails: MediaDetails
  sourceUrl(size: MediaItemSizeEnum): String
  title(format: PostObjectFieldFormatEnum): String
}

type NodeWithFeaturedImageToMediaItemConnectionEdge {
  node: MediaItem!
}`;
