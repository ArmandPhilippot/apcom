import { config } from '@config/website';
import { getPublishedPosts } from '@services/graphql/queries';
import { ArticlePreview } from '@ts/types/articles';
import { PostsList } from '@ts/types/blog';
import { Feed } from 'feed';

const getAllPosts = async (): Promise<ArticlePreview[]> => {
  const posts: ArticlePreview[] = [];
  let hasNextPage = true;
  let after = undefined;

  do {
    const postsList: PostsList = await getPublishedPosts({ first: 10, after });
    posts.push(...postsList.posts);
    hasNextPage = postsList.pageInfo.hasNextPage;
    after = postsList.pageInfo.endCursor;
  } while (hasNextPage);

  return posts;
};

export const generateFeed = async () => {
  const websiteUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL : '';
  const author = {
    name: config.name,
    email: process.env.AUTHOR_EMAIL,
    link: websiteUrl,
  };
  const copyright = `${config.name} CC BY SA ${config.copyright.startYear} - ${config.copyright.endYear}`;
  const title = `${config.name} | ${config.baseline}`;

  const feed = new Feed({
    author,
    copyright,
    description: process.env.FEED_DESCRIPTION,
    feedLinks: {
      json: `${websiteUrl}/feed/json`,
      atom: `${websiteUrl}/feed/atom`,
    },
    generator: 'Feed & NextJS',
    id: websiteUrl,
    language: config.locales.defaultLocale,
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
