export const commonTypes = `enum PostObjectFieldFormatEnum {
  RAW
  RENDERED
}

enum OrderEnum {
  ASC
  DESC
}

enum PostObjectsConnectionOrderbyEnum {
  AUTHOR
  COMMENT_COUNT
  DATE
  IN
  MENU_ORDER
  MODIFIED
  NAME_IN
  PARENT
  SLUG
  TITLE
}

enum AvatarRatingEnum {
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

type ContentPartsType {
  afterMore(format: PostObjectFieldFormatEnum): String
  beforeMore(format: PostObjectFieldFormatEnum): String
}

type InfoType {
  wordsCount: Int
}

type PostTypeSEO {
  metaDesc: String
  title: String
}`;
