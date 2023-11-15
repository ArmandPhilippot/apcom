import { Feed } from 'feed';
import {
  getArticleFromRawData,
  getArticles,
  getTotalArticles,
} from '../../services/graphql';
import type { Article } from '../../types';
import { CONFIG } from '../config';
import { ROUTES } from '../constants';

/**
 * Retrieve the data for all the articles.
 *
 * @returns {Promise<Article[]>} - All the articles.
 */
const getAllArticles = async (): Promise<Article[]> => {
  const totalArticles = await getTotalArticles();
  const rawArticles = await getArticles({ first: totalArticles });
  const articles: Article[] = [];

  rawArticles.edges.forEach((edge) => {
    articles.push(getArticleFromRawData(edge.node));
  });

  return articles;
};

/**
 * Generate a new feed.
 *
 * @returns {Promise<Feed>} - The feed.
 */
export const generateFeed = async (): Promise<Feed> => {
  const author = {
    name: CONFIG.name,
    email: process.env.APP_AUTHOR_EMAIL,
    link: CONFIG.url,
  };
  const copyright = `${CONFIG.name} CC BY SA ${CONFIG.copyright.startYear} - ${CONFIG.copyright.endYear}`;
  const title = `${CONFIG.name} | ${CONFIG.baseline}`;

  const feed = new Feed({
    author,
    copyright,
    description: process.env.APP_FEED_DESCRIPTION,
    feedLinks: {
      json: `${CONFIG.url}${ROUTES.RSS}/json`,
      atom: `${CONFIG.url}${ROUTES.RSS}/atom`,
    },
    generator: 'Feed & NextJS',
    id: CONFIG.url,
    language: CONFIG.locales.defaultLocale,
    link: CONFIG.url,
    title,
  });

  const articles = await getAllArticles();

  articles.forEach((article) => {
    feed.addItem({
      content: article.intro,
      date: new Date(article.meta.dates.publication),
      description: article.intro,
      id: `${article.id}`,
      link: `${CONFIG.url}${ROUTES.ARTICLE}/${article.slug}`,
      title: article.title,
    });
  });

  return feed;
};
