import { authorTypes } from './author.types';
import { commentTypes } from './comment.types';
import { commonTypes } from './common.types';
import { featuredImageTypes } from './featured-image.types';
import { postTypes } from './post.types';
import { sendEmailTypes } from './send-email.types';
import { thematicTypes } from './thematic.types';
import { topicTypes } from './topic.types';

const rootQueryType = `type Query {
  comments(
    after: String
    before: String
    first: Int
    last: Int
    where: RootQueryToCommentConnectionWhereArgs
  ): RootQueryToCommentConnection
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
  thematic(
    asPreview: Boolean
    id: ID!
    idType: ThematicIdType
  ): Thematic
  thematics(
    after: String
    before: String
    first: Int
    last: Int
    where: RootQueryToThematicConnectionWhereArgs
  ): RootQueryToThematicConnection
  topic(
    asPreview: Boolean
    id: ID!
    idType: TopicIdType
  ): Topic
  topics(
    after: String
    before: String
    first: Int
    last: Int
    where: RootQueryToTopicConnectionWhereArgs
  ): RootQueryToTopicConnection
}`;

const rootMutationType = `type Mutation {
  sendEmail(input: SendEmailInput!): SendEmailPayload
}`;

export const types = [
  authorTypes,
  commentTypes,
  commonTypes,
  featuredImageTypes,
  postTypes,
  sendEmailTypes,
  thematicTypes,
  topicTypes,
  rootQueryType,
  rootMutationType,
];
