import { lastPostCursorHandler } from './last-post-cursor.handler';
import { postHandler } from './post.handler';
import { postsCountHandler } from './posts-count.handler';
import { postsListHandler } from './posts-list.handler';
import { postsSlugsHandler } from './posts-slugs.handler';
import { recentPostsHandler } from './recent-posts.handler';

export const postsHandlers = [
  lastPostCursorHandler,
  postHandler,
  postsCountHandler,
  postsListHandler,
  postsSlugsHandler,
  recentPostsHandler,
];
