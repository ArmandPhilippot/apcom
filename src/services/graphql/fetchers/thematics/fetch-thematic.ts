import type { Nullable, WPThematic } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type ThematicResponse = {
  thematic: Nullable<WPThematic>;
};

const thematicQuery = `query Thematic($slug: ID!) {
  thematic(id: $slug, idType: SLUG) {
    acfThematics {
      postsInThematic {
        ... on Post {
          acfPosts {
            postsInTopic {
              ... on Topic {
                databaseId
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
          slug
          title
        }
      }
    }
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
 * Retrieve a WordPress thematic by slug.
 *
 * @param {string} slug - The thematic slug.
 * @returns {Promise<WPThematic>} The requested thematic.
 */
export const fetchThematic = async (slug: string): Promise<WPThematic> => {
  const response = await fetchGraphQL<ThematicResponse>({
    query: thematicQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.thematic)
    return Promise.reject(
      new Error(`No thematic found for the following slug ${slug}.`)
    );

  return response.thematic;
};
