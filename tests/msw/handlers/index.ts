import { commentsHandlers } from './comments';
import { postsHandlers } from './posts';
import { thematicsHandlers } from './thematics';

export const handlers = [
  ...commentsHandlers,
  ...postsHandlers,
  ...thematicsHandlers,
];
