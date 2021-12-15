import { Cover } from './cover';

type TaxonomyPreview = {
  databaseId: number;
  id: string;
  slug: string;
  title: string;
};

export type SubjectPreview = TaxonomyPreview & {
  cover: Cover;
};

export type ThematicPreview = TaxonomyPreview;
