import { topicHandler } from './topic.handler';
import { topicsCountHandler } from './topics-count.handler';
import { topicsListHandler } from './topics-list.handler';
import { topicsSlugsHandler } from './topics-slugs.handler';

export const topicsHandlers = [
  topicHandler,
  topicsCountHandler,
  topicsListHandler,
  topicsSlugsHandler,
];
