import { ArticlePreview } from '@ts/types/articles';
import {
  fetchPostsListReturn,
  getPostsListReturn,
  PostsListResponse,
} from '@ts/types/blog';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

export const fetchPublishedPosts: fetchPostsListReturn = async (
  first = 10,
  after = ''
) => {
  const client = getGraphQLClient();
  const query = gql`
    query AllPublishedPosts($first: Int, $after: String) {
      posts(
        after: $after
        first: $first
        where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
      ) {
        edges {
          cursor
          node {
            acfPosts {
              postsInSubject {
                ... on Subject {
                  databaseId
                  featuredImage {
                    node {
                      altText
                      sourceUrl
                      title
                    }
                  }
                  id
                  slug
                  title
                }
              }
              postsInThematic {
                ... on Thematic {
                  databaseId
                  id
                  slug
                  title
                }
              }
            }
            commentCount
            contentParts {
              beforeMore
            }
            date
            featuredImage {
              node {
                altText
                sourceUrl
                title
              }
            }
            id
            databaseId
            modified
            slug
            title
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;

  const variables = { first, after };

  try {
    const response: PostsListResponse = await client.request(query, variables);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
};

export const getPublishedPosts: getPostsListReturn = async ({
  first = 10,
  after = '',
}) => {
  const rawPostsList = await fetchPublishedPosts(first, after);
  const postsList: ArticlePreview[] = rawPostsList.posts.edges.map((post) => {
    const {
      acfPosts,
      commentCount,
      contentParts,
      databaseId,
      date,
      id,
      modified,
      slug,
      title,
    } = post.node;
    const content = contentParts.beforeMore;
    const dates = { publication: date, update: modified };
    const subjects =
      acfPosts.postsInSubject && acfPosts.postsInSubject?.length > 0
        ? acfPosts.postsInSubject
        : [];
    const thematics =
      acfPosts.postsInThematics && acfPosts.postsInThematics?.length > 0
        ? acfPosts.postsInThematics
        : [];

    return {
      commentCount,
      content,
      databaseId,
      date: dates,
      id,
      slug,
      subjects,
      thematics,
      title,
    };
  });

  return { posts: postsList, pageInfo: rawPostsList.posts.pageInfo };
};
