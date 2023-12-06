import { commentsHandlers } from './comments';
import { postsHandlers } from './posts';
import { repositoriesHandlers } from './repositories';
import { thematicsHandlers } from './thematics';
import { topicsHandlers } from './topics';

export const handlers = [
  ...commentsHandlers,
  ...postsHandlers,
  ...repositoriesHandlers,
  ...thematicsHandlers,
  ...topicsHandlers,
];
