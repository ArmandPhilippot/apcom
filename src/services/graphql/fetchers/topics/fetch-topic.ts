import type { Nullable, WPTopic } from '../../../../types';
import { fetchGraphQL, getGraphQLUrl } from '../../../../utils/helpers';

export type TopicResponse = {
  topic: Nullable<WPTopic>;
};

const topicQuery = `query Topic($slug: ID!) {
  topic(id: $slug, idType: SLUG) {
    acfTopics {
      officialWebsite
      postsInTopic {
        ... on Post {
          acfPosts {
            postsInThematic {
              ... on Thematic {
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
 * Retrieve a WordPress topic by slug.
 *
 * @param {string} slug - The topic slug.
 * @returns {Promise<WPTopic>} The requested topic.
 */
export const fetchTopic = async (slug: string): Promise<WPTopic> => {
  const response = await fetchGraphQL<TopicResponse>({
    query: topicQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  });

  if (!response.topic)
    return Promise.reject(
      new Error(`No topic found for the following slug ${slug}.`)
    );

  return response.topic;
};
