import { ArticlePreview } from '@ts/types/articles';
import {
  AllTaxonomiesSlugResponse,
  FetchAllTaxonomiesSlugReturn,
  FetchThematicByReturn,
  GetTaxonomyByReturn,
  Taxonomy,
} from '@ts/types/taxonomies';
import { gql } from 'graphql-request';
import { getGraphQLClient } from './client';

export const fetchThematicBySlug: FetchThematicByReturn = async (
  slug: string
) => {
  const client = getGraphQLClient();
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
        date
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

  try {
    const response = client.request(query, variables);
    return response;
  } catch (error) {
    console.error(error, undefined, 2);
    process.exit(1);
  }
};

export const getThematicBySlug: GetTaxonomyByReturn = async (slug: string) => {
  const rawThematic = await fetchThematicBySlug(slug);

  const content = rawThematic.thematicBy.contentParts.afterMore;
  const intro = rawThematic.thematicBy.contentParts.beforeMore;
  const rawPosts = rawThematic.thematicBy.acfThematics.postsInThematic;
  const formattedPosts: ArticlePreview[] = rawPosts.map((post) => {
    const content = post.contentParts.beforeMore;
    const cover = post.featuredImage ? post.featuredImage.node : null;
    const dates = { publication: post.date, update: post.modified };
    const subjects =
      post.acfPosts.postsInSubject && post.acfPosts.postsInSubject?.length > 0
        ? post.acfPosts.postsInSubject
        : [];
    const thematics =
      post.acfPosts.postsInThematic && post.acfPosts.postsInThematic?.length > 0
        ? post.acfPosts.postsInThematic
        : [];

    return {
      ...post,
      content,
      featuredImage: cover,
      date: dates,
      subjects,
      thematics,
    };
  });

  const formattedThematic: Taxonomy = {
    ...rawThematic.thematicBy,
    content,
    intro,
    posts: formattedPosts,
  };

  return formattedThematic;
};

export const fetchAllThematicsSlug: FetchAllTaxonomiesSlugReturn = async () => {
  const client = getGraphQLClient();
  const query = gql`
    query AllThematicsSlug {
      thematics {
        nodes {
          slug
        }
      }
    }
  `;

  try {
    const response: AllTaxonomiesSlugResponse = await client.request(query);
    return response.thematics.nodes;
  } catch (error) {
    console.error(error, undefined, 2);
    process.exit(1);
  }
};
