import { Slug } from '@ts/types/app';
import { Article, PostBy } from '@ts/types/articles';
import { AllPostsSlug, PostsList, RawPostsList } from '@ts/types/blog';
import {
  AllSubjectsSlug,
  AllThematicsSlug,
  Subject,
  SubjectBy,
  Thematic,
  ThematicBy,
} from '@ts/types/taxonomies';
import {
  getFormattedPost,
  getFormattedPostPreview,
  getFormattedSubject,
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

  const variables = { first, after, searchQuery };
  const response = await fetchApi<RawPostsList>(query, variables);
  const formattedPosts = response.posts.edges.map((post) => {
    const formattedPost = getFormattedPostPreview(post.node);

    return formattedPost;
  });

  const postsList = {
    posts: formattedPosts,
    pageInfo: response.posts.pageInfo,
  };

  return postsList;
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
          postsInSubject {
            ... on Subject {
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
  const post = getFormattedPost(response.postBy);

  return post;
};

//==============================================================================
// Subject query
//==============================================================================

export const getSubjectBySlug = async (slug: string): Promise<Subject> => {
  const query = gql`
    query SubjectBySlug($slug: String!) {
      subjectBy(slug: $slug) {
        acfSubjects {
          officialWebsite
          postsInSubject {
            ... on Post {
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
  const response = await fetchApi<SubjectBy>(query, variables);
  const subject = getFormattedSubject(response.subjectBy);

  return subject;
};

export const getAllSubjectsSlug = async (): Promise<Slug[]> => {
  // 10 000 is an arbitrary number that I use for small websites.
  const query = gql`
    query AllSubjectsSlug {
      subjects(first: 10000) {
        nodes {
          slug
        }
      }
    }
  `;
  const response = await fetchApi<AllSubjectsSlug>(query, null);
  return response.subjects.nodes;
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
  const thematic = getFormattedThematic(response.thematicBy);

  return thematic;
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
