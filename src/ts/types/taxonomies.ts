import { ArticlePreview, ArticlePreviewResponse } from './articles';
import { Cover } from './cover';

type TaxonomyPreview = {
  databaseId: number;
  id: string;
  slug: string;
  title: string;
};

export type Taxonomy = TaxonomyPreview & {
  content: string;
  date: string;
  intro: string;
  modified: string;
  posts: ArticlePreview[];
};

export type SubjectPreview = TaxonomyPreview & {
  cover: Cover;
};

export type ThematicPreview = TaxonomyPreview;

export type ThematicResponse = TaxonomyPreview & {
  acfThematics: {
    postsInThematic: ArticlePreviewResponse[];
  };
  contentParts: {
    afterMore: string;
    beforeMore: string;
  };
  date: string;
  modified: string;
};

export type ThematicProps = {
  thematic: Taxonomy;
};

export type AllTaxonomiesSlug = {
  slug: string;
};

export type AllTaxonomiesSlugResponse = {
  thematics: {
    nodes: AllTaxonomiesSlug[];
  };
};

export type ThematicByResponse = {
  thematicBy: ThematicResponse;
};

export type FetchThematicByReturn = (
  slug: string
) => Promise<ThematicByResponse>;

export type GetTaxonomyByReturn = (slug: string) => Promise<Taxonomy>;

export type FetchAllTaxonomiesSlugReturn = () => Promise<AllTaxonomiesSlug[]>;
