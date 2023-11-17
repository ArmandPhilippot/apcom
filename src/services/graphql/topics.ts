import type {
  EdgesResponse,
  GraphQLEdgesInput,
  PageLink,
  RawArticle,
  RawTopic,
  RawTopicPreview,
  Slug,
  Topic,
  TotalItems,
} from '../../types';
import {
  getImageFromRawData,
  getPageLinkFromRawData,
  sortPageLinksByName,
} from '../../utils/helpers';
import { fetchAPI } from './api';
import { getArticleFromRawData } from './articles';
import {
  topicBySlugQuery,
  topicsListQuery,
  topicsSlugQuery,
  totalTopicsQuery,
} from './topics.query';

/**
 * Retrieve the total number of topics.
 *
 * @returns {Promise<number>} - The topics total number.
 */
export const getTotalTopics = async (): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalTopicsQuery>({
    query: totalTopicsQuery,
  });

  return response.topics.pageInfo.total;
};

/**
 * Retrieve the given number of topics from API.
 *
 * @param {GraphQLEdgesInput} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawTopicPreview>>} The topics data.
 */
export const getTopicsPreview = async (
  props: GraphQLEdgesInput
): Promise<EdgesResponse<RawTopicPreview>> => {
  const response = await fetchAPI<RawTopicPreview, typeof topicsListQuery>({
    query: topicsListQuery,
    variables: props,
  });

  return response.topics;
};

/**
 * Convert raw data to a Topic object.
 *
 * @param {RawTopic} data - The page raw data.
 * @returns {Topic} The page data.
 */
export const getTopicFromRawData = async (data: RawTopic): Promise<Topic> => {
  const {
    acfTopics,
    contentParts,
    databaseId,
    date,
    featuredImage,
    info,
    modified,
    slug,
    title,
    seo,
  } = data;

  /**
   * Retrieve an array of related topics.
   *
   * @param posts - The topic posts.
   * @returns {PageLink[]} An array of topics links.
   */
  const getRelatedThematics = (posts: RawArticle[]): PageLink[] => {
    const thematics: PageLink[] = [];

    posts.forEach((post) => {
      if (post.acfPosts.postsInThematic) {
        for (const thematic of post.acfPosts.postsInThematic) {
          thematics.push(getPageLinkFromRawData(thematic, 'thematic'));
        }
      }
    });

    const thematicsIds = thematics.map((thematic) => thematic.id);
    const uniqueThematics = thematics.filter(
      ({ id }, index) => !thematicsIds.includes(id, index + 1)
    );

    return uniqueThematics.sort(sortPageLinksByName);
  };

  return {
    content: contentParts.afterMore,
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      articles: await Promise.all(
        acfTopics.postsInTopic.map(async (post) => getArticleFromRawData(post))
      ),
      cover: featuredImage?.node
        ? getImageFromRawData(featuredImage.node)
        : undefined,
      dates: { publication: date, update: modified },
      website: acfTopics.officialWebsite,
      seo: {
        description: seo?.metaDesc ?? '',
        title: seo?.title ?? '',
      },
      thematics: getRelatedThematics(acfTopics.postsInTopic),
      wordsCount: info.wordsCount,
    },
    slug,
    title,
  };
};

/**
 * Retrieve a Topic object by slug.
 *
 * @param {string} slug - The topic slug.
 * @returns {Promise<Article>} The requested topic.
 */
export const getTopicBySlug = async (slug: string): Promise<Topic> => {
  const response = await fetchAPI<RawTopic, typeof topicBySlugQuery>({
    query: topicBySlugQuery,
    variables: { slug },
  });

  return getTopicFromRawData(response.topic);
};

/**
 * Retrieve all the topics slugs.
 *
 * @returns {Promise<string[]>} - An array of topics slugs.
 */
export const getAllTopicsSlugs = async (): Promise<string[]> => {
  const totalTopics = await getTotalTopics();
  const response = await fetchAPI<Slug, typeof topicsSlugQuery>({
    query: topicsSlugQuery,
    variables: { first: totalTopics },
  });

  return response.topics.edges.map((edge) => edge.node.slug);
};
