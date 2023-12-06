import { addResolversToSchema } from '@graphql-tools/schema';
import type { IResolvers } from '@graphql-tools/utils';
import { buildSchema } from 'graphql';
import { types } from './types';

/* eslint-disable camelcase -- We have no control on WP GraphQL types */
const resolvers: IResolvers = {
  Post_Acfposts_PostsInThematic: {
    __resolveType() {
      return 'Thematic';
    },
  },
  Post_Acfposts_PostsInTopic: {
    __resolveType() {
      return 'Topic';
    },
  },
  Thematic_Acfthematics_PostsInThematic: {
    __resolveType() {
      return 'Post';
    },
  },
  Topic_Acftopics_PostsInTopic: {
    __resolveType() {
      return 'Post';
    },
  },
};
/* eslint-enable camelcase */

// cSpell:ignore Acfposts Acfthematics Acftopics camelcase

const schemaFromTypes = buildSchema(types.join('\n'));

export const schema = addResolversToSchema({
  schema: schemaFromTypes,
  resolvers,
});

export const githubSchema = buildSchema(`
scalar DateTime

type Repository {
  createdAt: DateTime!
  stargazerCount: Int!
  updatedAt: DateTime!
}

type Query {
  repository(
    followRenames: Boolean = true
    name: String!
    owner: String!
  ): Repository
}`);
