import { thematicHandler } from './thematic.handler';
import { thematicsCountHandler } from './thematics-count.handler';
import { thematicsListHandler } from './thematics-list.handler';
import { thematicsSlugsHandler } from './thematics-slugs.handler';

export const thematicsHandlers = [
  thematicHandler,
  thematicsCountHandler,
  thematicsListHandler,
  thematicsSlugsHandler,
];
