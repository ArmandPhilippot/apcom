import { PageLink, Slug, Topic } from '@ts/types/app';
import {
  RawArticle,
  RawTopic,
  RawTopicPreview,
  TotalItems,
} from '@ts/types/raw-data';
import { getImageFromRawData } from '@utils/helpers/images';
import { getPageLinkFromRawData } from '@utils/helpers/pages';
import { EdgesResponse, EdgesVars, fetchAPI, getAPIUrl } from './api';
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
    api: getAPIUrl(),
    query: totalTopicsQuery,
  });

  return response.topics.pageInfo.total;
};

/**
 * Retrieve the given number of topics from API.
 *
 * @param {EdgesVars} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawTopicPreview>>} The topics data.
 */
export const getTopicsPreview = async (
  props: EdgesVars
): Promise<EdgesResponse<RawTopicPreview>> => {
  const response = await fetchAPI<RawTopicPreview, typeof topicsListQuery>({
    api: getAPIUrl(),
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
export const getTopicFromRawData = (data: RawTopic): Topic => {
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
        post.acfPosts.postsInThematic.forEach((thematic) =>
          thematics.push(getPageLinkFromRawData(thematic))
        );
      }
    });

    const thematicsIds = thematics.map((thematic) => thematic.id);
    const uniqueThematics = thematics.filter(
      ({ id }, index) => !thematicsIds.includes(id, index + 1)
    );
    const sortThematicByName = (a: PageLink, b: PageLink) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    };

    return uniqueThematics.sort(sortThematicByName);
  };

  return {
    content: contentParts.afterMore,
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      articles: acfTopics.postsInTopic.map((post) =>
        getArticleFromRawData(post)
      ),
      cover: featuredImage?.node
        ? getImageFromRawData(featuredImage.node)
        : undefined,
      dates: { publication: date, update: modified },
      website: acfTopics.officialWebsite,
      seo: {
        description: seo?.metaDesc || '',
        title: seo?.title || '',
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
    api: getAPIUrl(),
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
    api: getAPIUrl(),
    query: topicsSlugQuery,
    variables: { first: totalTopics },
  });

  return response.topics.edges.map((edge) => edge.node.slug);
};
