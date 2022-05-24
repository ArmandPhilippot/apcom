import {
  getArticleFromRawData,
  getArticles,
  getTotalArticles,
} from '@services/graphql/articles';
import { Article } from '@ts/types/app';
import { settings } from '@utils/config';
import { Feed } from 'feed';

/**
 * Retrieve the data for all the articles.
 *
 * @returns {Promise<Article[]>} - All the articles.
 */
const getAllArticles = async (): Promise<Article[]> => {
  const totalArticles = await getTotalArticles();
  const rawArticles = await getArticles({ first: totalArticles });
  const articles: Article[] = [];

  rawArticles.edges.forEach((edge) =>
    articles.push(getArticleFromRawData(edge.node))
  );

  return articles;
};

/**
 * Generate a new feed.
 *
 * @returns {Promise<Feed>} - The feed.
 */
export const generateFeed = async (): Promise<Feed> => {
  const author = {
    name: settings.name,
    email: process.env.APP_AUTHOR_EMAIL,
    link: settings.url,
  };
  const copyright = `${settings.name} CC BY SA ${settings.copyright.startYear} - ${settings.copyright.endYear}`;
  const title = `${settings.name} | ${settings.baseline.fr}`;

  const feed = new Feed({
    author,
    copyright,
    description: process.env.APP_FEED_DESCRIPTION,
    feedLinks: {
      json: `${settings.url}/feed/json`,
      atom: `${settings.url}/feed/atom`,
    },
    generator: 'Feed & NextJS',
    id: settings.url,
    language: settings.locales.defaultLocale,
    link: settings.url,
    title,
  });

  const articles = await getAllArticles();

  articles.forEach((article) => {
    feed.addItem({
      content: article.intro,
      date: new Date(article.meta!.dates.publication),
      description: article.intro,
      id: `${article.id}`,
      link: `${settings.url}/article/${article.slug}`,
      title: article.title,
    });
  });

  return feed;
};
