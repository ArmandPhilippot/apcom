import { Slug } from '@ts/types/app';
import { Article, PostBy } from '@ts/types/articles';
import { AllPostsSlug, PostsList, RawPostsList } from '@ts/types/blog';
import {
  AllTopics,
  AllTopicsSlug,
  AllThematics,
  AllThematicsSlug,
  Topic,
  TopicBy,
  TopicPreview,
  Thematic,
  ThematicBy,
  ThematicPreview,
} from '@ts/types/taxonomies';
import {
  getFormattedPost,
  getFormattedPostPreview,
  getFormattedTopic,
  getFormattedThematic,
} from '@utils/helpers/format';
import { gql } from 'graphql-request';
import { fetchApi } from './api';

//==============================================================================
// Posts list queries
//==============================================================================

export const getPublishedPosts = async ({
  first = 10,
  after = '',
  searchQuery = '',
}: {
  first: number;
  after?: string;
  searchQuery?: string;
}): Promise<PostsList> => {
  const query = gql`
    query AllPublishedPosts($first: Int, $after: String, $searchQuery: String) {
      posts(
        after: $after
        first: $first
        where: {
          status: PUBLISH
          orderby: { field: DATE, order: DESC }
          search: $searchQuery
        }
      ) {
        edges {
          cursor
          node {
            acfPosts {
              postsInTopic {
                ... on Topic {
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
          total
        }
      }
    }
  `;

  const variables = { first, after, searchQuery };
  const response = await fetchApi<RawPostsList>(query, variables);
  const formattedPosts = response.posts.edges.map((post) => {
    return getFormattedPostPreview(post.node);
  });

  return {
    posts: formattedPosts,
    pageInfo: response.posts.pageInfo,
  };
};

export const getAllPostsSlug = async (): Promise<Slug[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllPostsSlug {
      posts(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;

  const response = await fetchApi<AllPostsSlug>(query, null);
  return response.posts.nodes;
};

//==============================================================================
// Single Post query
//==============================================================================

export const getPostBySlug = async (slug: string): Promise<Article> => {
  const query = gql`
    query PostBySlug($slug: String!) {
      postBy(slug: $slug) {
        acfPosts {
          postsInTopic {
            ... on Topic {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
              }
              slug
              title
            }
          }
          postsInThematic {
            ... on Thematic {
              id
              slug
              title
            }
          }
        }
        author {
          node {
            firstName
            lastName
            name
          }
        }
        commentCount
        comments(where: { order: ASC, orderby: COMMENT_DATE }) {
          nodes {
            approved
            author {
              node {
                gravatarUrl
                name
                url
              }
            }
            commentId
            content
            date
            id
            parentDatabaseId
            parentId
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
            sourceUrl
            title
          }
        }
        id
        modified
        seo {
          title
          metaDesc
          opengraphAuthor
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          readingTime
        }
        title
      }
    }
  `;
  const variables = { slug };
  const response = await fetchApi<PostBy>(query, variables);

  return getFormattedPost(response.postBy);
};

//==============================================================================
// Topic query
//==============================================================================

export const getTopicBySlug = async (slug: string): Promise<Topic> => {
  const query = gql`
    query TopicBySlug($slug: String!) {
      topicBy(slug: $slug) {
        acfTopics {
          officialWebsite
          postsInTopic {
            ... on Post {
              acfPosts {
                postsInTopic {
                  ... on Topic {
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
              id
              commentCount
              contentParts {
                beforeMore
              }
              databaseId
              date
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
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
            sourceUrl
            title
          }
        }
        id
        modified
        seo {
          metaDesc
          opengraphAuthor
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          readingTime
          title
        }
        title
      }
    }
  `;
  const variables = { slug };
  const response = await fetchApi<TopicBy>(query, variables);

  return getFormattedTopic(response.topicBy);
};

export const getAllTopicsSlug = async (): Promise<Slug[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllTopicsSlug {
      topics(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;
  const response = await fetchApi<AllTopicsSlug>(query, null);
  return response.topics.nodes;
};

export const getAllTopics = async (): Promise<TopicPreview[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllTopics {
      topics(first: 10000, where: { orderby: { field: TITLE, order: ASC } }) {
        nodes {
          databaseId
          slug
          title
        }
      }
    }
  `;

  const response = await fetchApi<AllTopics>(query, null);
  return response.topics.nodes;
};

//==============================================================================
// Thematic query
//==============================================================================

export const getThematicBySlug = async (slug: string): Promise<Thematic> => {
  const query = gql`
    query ThematicBySlug($slug: String!) {
      thematicBy(slug: $slug) {
        acfThematics {
          postsInThematic {
            ... on Post {
              acfPosts {
                postsInTopic {
                  ... on Topic {
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
              id
              commentCount
              contentParts {
                beforeMore
              }
              databaseId
              date
              featuredImage {
                node {
                  altText
                  sourceUrl
                  title
                }
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
        id
        modified
        seo {
          metaDesc
          opengraphAuthor
          opengraphDescription
          opengraphImage {
            altText
            sourceUrl
            srcSet
          }
          opengraphModifiedTime
          opengraphPublishedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
          readingTime
          title
        }
        title
      }
    }
  `;
  const variables = { slug };
  const response = await fetchApi<ThematicBy>(query, variables);

  return getFormattedThematic(response.thematicBy);
};

export const getAllThematicsSlug = async (): Promise<Slug[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllThematicsSlug {
      thematics(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;
  const response = await fetchApi<AllThematicsSlug>(query, null);
  return response.thematics.nodes;
};

export const getAllThematics = async (): Promise<ThematicPreview[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllThematics {
      thematics(
        first: 10000
        where: { orderby: { field: TITLE, order: ASC } }
      ) {
        nodes {
          databaseId
          slug
          title
        }
      }
    }
  `;

  const response = await fetchApi<AllThematics>(query, null);
  return response.thematics.nodes;
};
