import { getPostsTotal, getPublishedPosts } from '@services/graphql/queries';
import { ArticlePreview } from '@ts/types/articles';
import { PostsList } from '@ts/types/blog';
import { settings } from '@utils/config';
import { Feed } from 'feed';

const getAllPosts = async (): Promise<ArticlePreview[]> => {
  const totalPosts = await getPostsTotal();
  const posts: ArticlePreview[] = [];

  const postsList: PostsList = await getPublishedPosts({ first: totalPosts });
  posts.push(...postsList.posts);

  return posts;
};

export const generateFeed = async () => {
  const websiteUrl = `${process.env.NEXT_PUBLIC_APP_PROTOCOL}://${process.env.NEXT_PUBLIC_APP_DOMAIN}`;
  const author = {
    name: settings.name,
    email: process.env.APP_AUTHOR_EMAIL,
    link: websiteUrl,
  };
  const copyright = `${settings.name} CC BY SA ${settings.copyright.startYear} - ${settings.copyright.endYear}`;
  const title = `${settings.name} | ${settings.baseline.fr}`;

  const feed = new Feed({
    author,
    copyright,
    description: process.env.APP_FEED_DESCRIPTION,
    feedLinks: {
      json: `${websiteUrl}/feed/json`,
      atom: `${websiteUrl}/feed/atom`,
    },
    generator: 'Feed & NextJS',
    id: websiteUrl,
    language: settings.locales.defaultLocale,
    link: websiteUrl,
    title,
  });

  const posts = await getAllPosts();

  posts.forEach((post) => {
    feed.addItem({
      content: post.intro,
      date: new Date(post.dates.publication),
      description: post.intro,
      id: post.id,
      link: `${websiteUrl}/article/${post.slug}`,
      title: post.title,
    });
  });

  return feed;
};
