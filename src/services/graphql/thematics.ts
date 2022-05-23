import { PageLink, Slug, Thematic } from '@ts/types/app';
import {
  RawArticle,
  RawThematic,
  RawThematicPreview,
  TotalItems,
} from '@ts/types/raw-data';
import { getImageFromRawData } from '@utils/helpers/images';
import { getPageLinkFromRawData } from '@utils/helpers/pages';
import { EdgesResponse, EdgesVars, fetchAPI, getAPIUrl } from './api';
import { getArticleFromRawData } from './articles';
import {
  thematicBySlugQuery,
  thematicsListQuery,
  thematicsSlugQuery,
  totalThematicsQuery,
} from './thematics.query';

/**
 * Retrieve the total number of thematics.
 *
 * @returns {Promise<number>} - The thematics total number.
 */
export const getTotalThematics = async (): Promise<number> => {
  const response = await fetchAPI<TotalItems, typeof totalThematicsQuery>({
    api: getAPIUrl(),
    query: totalThematicsQuery,
  });

  return response.thematics.pageInfo.total;
};

/**
 * Retrieve the given number of thematics from API.
 *
 * @param {EdgesVars} props - An object of GraphQL variables.
 * @returns {Promise<EdgesResponse<RawThematicPreview>>} The thematics data.
 */
export const getThematicsPreview = async (
  props: EdgesVars
): Promise<EdgesResponse<RawThematicPreview>> => {
  const response = await fetchAPI<
    RawThematicPreview,
    typeof thematicsListQuery
  >({ api: getAPIUrl(), query: thematicsListQuery, variables: props });

  return response.thematics;
};

/**
 * Convert raw data to an Thematic object.
 *
 * @param {RawThematic} data - The page raw data.
 * @returns {Thematic} The page data.
 */
export const getThematicFromRawData = (data: RawThematic): Thematic => {
  const {
    acfThematics,
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
   * @param posts - The thematic posts.
   * @returns {PageLink[]} An array of topics links.
   */
  const getRelatedTopics = (posts: RawArticle[]): PageLink[] => {
    const topics: PageLink[] = [];

    posts.forEach((post) => {
      if (post.acfPosts.postsInTopic) {
        post.acfPosts.postsInTopic.forEach((topic) =>
          topics.push(getPageLinkFromRawData(topic, 'topic'))
        );
      }
    });

    const topicsIds = topics.map((topic) => topic.id);
    const uniqueTopics = topics.filter(
      ({ id }, index) => !topicsIds.includes(id, index + 1)
    );
    const sortTopicByName = (a: PageLink, b: PageLink) => {
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

    return uniqueTopics.sort(sortTopicByName);
  };

  return {
    content: contentParts.afterMore,
    id: databaseId,
    intro: contentParts.beforeMore,
    meta: {
      articles: acfThematics.postsInThematic.map((post) =>
        getArticleFromRawData(post)
      ),
      cover: featuredImage?.node
        ? getImageFromRawData(featuredImage.node)
        : undefined,
      dates: { publication: date, update: modified },
      seo: {
        description: seo?.metaDesc || '',
        title: seo?.title || '',
      },
      topics: getRelatedTopics(acfThematics.postsInThematic),
      wordsCount: info.wordsCount,
    },
    slug,
    title,
  };
};

/**
 * Retrieve a Thematic object by slug.
 *
 * @param {string} slug - The thematic slug.
 * @returns {Promise<Article>} The requested thematic.
 */
export const getThematicBySlug = async (slug: string): Promise<Thematic> => {
  const response = await fetchAPI<RawThematic, typeof thematicBySlugQuery>({
    api: getAPIUrl(),
    query: thematicBySlugQuery,
    variables: { slug },
  });

  return getThematicFromRawData(response.thematic);
};

/**
 * Retrieve all the thematics slugs.
 *
 * @returns {Promise<string[]>} - An array of thematics slugs.
 */
export const getAllThematicsSlugs = async (): Promise<string[]> => {
  const totalThematics = await getTotalThematics();
  const response = await fetchAPI<Slug, typeof thematicsSlugQuery>({
    api: getAPIUrl(),
    query: thematicsSlugQuery,
    variables: { first: totalThematics },
  });

  return response.thematics.edges.map((edge) => edge.node.slug);
};
