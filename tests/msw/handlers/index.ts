import { commentsHandlers } from './comments';
import { postsHandlers } from './posts';

export const handlers = [...commentsHandlers, ...postsHandlers];
