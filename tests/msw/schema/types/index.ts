import { authorTypes } from './author.types';
import { commonTypes } from './common.types';
import { featuredImageTypes } from './featured-image.types';
import { postTypes } from './post.types';
import { thematicTypes } from './thematic.types';
import { topicTypes } from './topic.types';

const rootQueryType = `type Query {
  post(
    asPreview: Boolean
    id: ID!
    idType: PostIdType
  ): Post
  posts(
    after: String
    before: String
    first: Int
    last: Int
    where: RootQueryToPostConnectionWhereArgs
  ): RootQueryToPostConnection
}`;

export const types = [
  authorTypes,
  commonTypes,
  featuredImageTypes,
  postTypes,
  thematicTypes,
  topicTypes,
  rootQueryType,
];
