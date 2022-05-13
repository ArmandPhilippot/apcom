/**
 * Query the full topic data using its slug.
 */
export const topicBySlugQuery = `query TopicBy($slug: ID!) {
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
 * Query an array of partial topics.
 */
export const topicsListQuery = `query TopicsList($after: String = "", $first: Int = 10) {
  topics(
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
 * Query an array of topics slug.
 */
export const topicsSlugQuery = `query TopicsSlug($first: Int = 10, $after: String = "") {
  topics(after: $after, first: $first) {
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
 * Query the total number of topics.
 */
export const totalTopicsQuery = `query TopicsTotal {
  topics {
    pageInfo {
      total
    }
  }
}`;
