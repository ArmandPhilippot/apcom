import { commentsHandlers } from './comments';
import { formsHandlers } from './forms';
import { postsHandlers } from './posts';
import { repositoriesHandlers } from './repositories';
import { thematicsHandlers } from './thematics';
import { topicsHandlers } from './topics';

export const handlers = [
  ...commentsHandlers,
  ...formsHandlers,
  ...postsHandlers,
  ...repositoriesHandlers,
  ...thematicsHandlers,
  ...topicsHandlers,
];
