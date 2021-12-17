import {
  Article,
  FetchPostByReturn,
  GetPostByReturn,
  PostByResponse,
} from '@ts/types/articles';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

const fetchPostBySlug: FetchPostByReturn = async (slug: string) => {
  const client = getGraphQLClient();
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
        comments {
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
        date
        featuredImage {
          node {
            altText
            sourceUrl
            title
          }
        }
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

  try {
    const response: PostByResponse = await client.request(query, variables);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 2));
    process.exit(1);
  }
};

export const getPostBySlug: GetPostByReturn = async (slug: string) => {
  const rawPost = await fetchPostBySlug(slug);

  const author = rawPost.postBy.author.node;
  const comments = rawPost.postBy.comments.nodes.reverse().map((comment) => {
    const author = comment.author.node;
    return { ...comment, author: author, replies: [] };
  });
  const content = rawPost.postBy.contentParts.afterMore;
  const featuredImage = rawPost.postBy.featuredImage
    ? rawPost.postBy.featuredImage.node
    : null;
  const date = {
    publication: rawPost.postBy.date,
    update: rawPost.postBy.modified,
  };
  const intro = rawPost.postBy.contentParts.beforeMore;
  const subjects = rawPost.postBy.acfPosts.postsInSubject
    ? rawPost.postBy.acfPosts.postsInSubject
    : [];
  const thematics = rawPost.postBy.acfPosts.postsInThematic
    ? rawPost.postBy.acfPosts.postsInThematic
    : [];

  const formattedPost: Article = {
    ...rawPost.postBy,
    author,
    comments,
    content,
    featuredImage,
    date,
    intro,
    subjects,
    thematics,
  };

  return formattedPost;
};
