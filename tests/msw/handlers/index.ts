import { commentsHandlers } from './comments';
import { postsHandlers } from './posts';
import { thematicsHandlers } from './thematics';
import { topicsHandlers } from './topics';

export const handlers = [
  ...commentsHandlers,
  ...postsHandlers,
  ...thematicsHandlers,
  ...topicsHandlers,
];
