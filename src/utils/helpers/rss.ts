import { Feed } from 'feed';
import {
  convertPostPreviewToArticlePreview,
  fetchPostsList,
  fetchPostsCount,
} from '../../services/graphql';
import type { ArticlePreview } from '../../types';
import { CONFIG } from '../config';
import { ROUTES } from '../constants';

/**
 * Retrieve the data for all the articles.
 *
 * @returns {Promise<ArticlePreview[]>} All the articles.
 */
const getAllArticles = async (): Promise<ArticlePreview[]> => {
  const totalPosts = await fetchPostsCount();
  const posts = await fetchPostsList({ first: totalPosts });

  return posts.edges.map((edge) =>
    convertPostPreviewToArticlePreview(edge.node)
  );
};

/**
 * Generate a new feed.
 *
 * @returns {Promise<Feed>} The feed.
 */
export const generateFeed = async (): Promise<Feed> => {
  const author = {
    name: CONFIG.name,
    email: process.env.APP_AUTHOR_EMAIL,
    link: CONFIG.url,
  };
  const copyright = `\u00A9 ${CONFIG.copyright.startYear} - ${CONFIG.copyright.endYear} ${CONFIG.name} - CC BY SA`;
  const title = `${CONFIG.name} | ${CONFIG.baseline}`;

  const feed = new Feed({
    author,
    copyright,
    description: process.env.APP_FEED_DESCRIPTION,
    favicon: `${CONFIG.url}/favicon.ico`,
    feedLinks: {
      json: `${CONFIG.url}${ROUTES.RSS}.json`,
      atom: `${CONFIG.url}${ROUTES.RSS}/atom`,
    },
    generator: 'Feed & NextJS',
    id: CONFIG.url,
    language: CONFIG.locales.defaultLocale,
    link: CONFIG.url,
    title,
  });

  const articles = await getAllArticles();

  for (const article of articles) {
    feed.addItem({
      author: [author],
      category: article.meta.thematics?.map((thematic) => {
        return {
          domain: `${CONFIG.url}${thematic.url}`,
          name: thematic.name,
        };
      }),
      content: article.intro,
      copyright,
      date: new Date(
        article.meta.dates.update ?? article.meta.dates.publication
      ),
      description: article.intro,
      id: `${article.id}`,
      image: article.meta.cover
        ? {
            url: article.meta.cover.src,
          }
        : undefined,
      link: `${CONFIG.url}${ROUTES.ARTICLE}/${article.slug}`,
      published: new Date(article.meta.dates.publication),
      title: article.title,
    });
  }

  return feed;
};
