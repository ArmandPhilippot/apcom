import { graphql } from 'msw';
import { GITHUB_API } from '../../../src/utils/constants';

const { env } = { ...process, ...window.process };
const wordpressGraphQLUrl = env.NEXT_PUBLIC_STAGING_GRAPHQL_API;

if (!wordpressGraphQLUrl)
  throw new Error('You forgot to define an URL for the WordPress GraphQL API');

export const githubAPI = graphql.link(GITHUB_API);
export const wordpressAPI = graphql.link(wordpressGraphQLUrl);
