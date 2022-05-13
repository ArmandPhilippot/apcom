/**
 * Query the full thematic data using its slug.
 */
export const thematicBySlugQuery = `query ThematicBy($slug: ID!) {
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
            readingTime
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
    info {
      readingTime
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
 * Query an array of partial thematics.
 */
export const thematicsListQuery = `query ThematicsList($after: String = "", $first: Int = 10) {
  thematics(
    after: $after
    first: $first
    where: {orderby: {field: TITLE, order: ASC}, status: PUBLISH}
  ) {
    edges {
      cursor
      node {
        databaseId
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
}`;

/**
 * Query an array of thematics slug.
 */
export const thematicsSlugQuery = `query ThematicsSlug($first: Int = 10, $after: String = "") {
  thematics(after: $after, first: $first) {
    edges {
      cursor
      node {
        slug
      }
    }
    pageInfo {
      total
    }
  }
}`;

/**
 * Query the total number of thematics.
 */
export const totalThematicsQuery = `query ThematicsTotal {
  thematics {
    pageInfo {
      total
    }
  }
}`;
