import type { Nullable, WPPost } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type PostResponse = {
  post: Nullable<WPPost>;
};

const postQuery = `query Post($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    acfPosts {
      postsInThematic {
        ... on Thematic {
          databaseId
          slug
          title
        }
      }
      postsInTopic {
        ... on Topic {
          databaseId
          featuredImage {
            node {
              altText
              mediaDetails {
                height
                width
              }
              sourceUrl
              title
            }
          }
          slug
          title
        }
      }
    }
    author {
      node {
        name
      }
    }
    commentCount
    contentParts {
      afterMore
      beforeMore
    }
    databaseId
    date
    featuredImage {
      node {
        altText
        mediaDetails {
          height
          width
        }
        sourceUrl
        title
      }
    }
    info {
      wordsCount
    }
    modified
    seo {
      metaDesc
      title
    }
    slug
    title
  }
}`;

/**
 * Retrieve a WordPress post by slug.
 *
 * @param {string} slug - The post slug.
 * @returns {Promise<WPPost>} The requested post.
 */
export const fetchPost = async (slug: string): Promise<WPPost> => {
  const response = await fetchGraphQL<PostResponse>({
    query: postQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.post)
    return Promise.reject(
      new Error(`No post found for the following slug ${slug}.`)
    );

  return response.post;
};
