/**
 * Query the full article data using its slug.
 */
export const articleBySlugQuery = `query PostBy($slug: ID!) {
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
        gravatarUrl
        name
        url
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
 * Query an array of partial articles.
 */
export const articlesQuery = `query Articles($after: String = "", $first: Int = 10, $search: String = "") {
  posts(
    after: $after
    first: $first
    where: {orderby: {field: DATE, order: DESC}, search: $search, status: PUBLISH}
  ) {
    edges {
      cursor
      node {
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
          readingTime
          wordsCount
        }
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
}`;

/**
 * Query an array of articles with only the minimal data.
 */
export const articlesCardQuery = `query ArticlesCard($first: Int = 10) {
  posts(
    first: $first
    where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}
  ) {
    nodes {
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
      slug
      title
    }
  }
}`;

/**
 * Query an array of articles slug.
 */
export const articlesSlugQuery = `query ArticlesSlug($first: Int = 10, $after: String = "") {
  posts(after: $after, first: $first) {
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
 * Query the total number of articles.
 */
export const totalArticlesQuery = `query PostsTotal($search: String = "") {
  posts(where: {search: $search}) {
    pageInfo {
      total
    }
  }
}`;

/**
 * Query the end cursor based on the queried posts number.
 */
export const articlesEndCursor = `query EndCursorAfter($first: Int) {
  posts(first: $first) {
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;
