import { ContentParts, Dates, Slug } from './app';
import { ArticlePreview, RawArticlePreview } from './articles';
import { Cover, RawCover } from './cover';
import { SEO } from './seo';

//==============================================================================
// Taxonomies base
//==============================================================================

type Taxonomy = {
  content: string;
  databaseId: number;
  dates: Dates;
  id: string;
  intro: string;
  posts: ArticlePreview[];
  seo: SEO;
  title: string;
};

type TaxonomyPreview = Pick<Taxonomy, 'databaseId' | 'id' | 'seo' | 'title'> & {
  slug: string;
};

//==============================================================================
// Subjects
//==============================================================================

export type Subject = Taxonomy & {
  featuredImage: Cover;
  officialWebsite: string;
};

export type RawSubjectPreview = TaxonomyPreview & {
  featuredImage: RawCover;
};

export type SubjectPreview = TaxonomyPreview & {
  featuredImage: Cover;
};

export type AllSubjects = {
  subjects: {
    nodes: SubjectPreview[];
  };
};

export type RawSubject = SubjectPreview & {
  acfSubjects: {
    officialWebsite: string;
    postsInSubject: RawArticlePreview[];
  };
  contentParts: ContentParts;
  date: string;
  featuredImage: RawCover;
  modified: string;
};

export type SubjectBy = {
  subjectBy: RawSubject;
};

export type AllSubjectsSlug = {
  subjects: {
    nodes: Slug[];
  };
};

export type SubjectProps = {
  subject: Subject;
};

//==============================================================================
// Thematics
//==============================================================================

export type Thematic = Taxonomy;

export type ThematicPreview = TaxonomyPreview;

export type AllThematics = {
  thematics: {
    nodes: ThematicPreview[];
  };
};

export type RawThematic = TaxonomyPreview & {
  acfThematics: {
    postsInThematic: RawArticlePreview[];
  };
  contentParts: ContentParts;
  date: string;
  modified: string;
};

export type ThematicBy = {
  thematicBy: RawThematic;
};

export type AllThematicsSlug = {
  thematics: {
    nodes: Slug[];
  };
};

export type ThematicProps = {
  thematic: Thematic;
};
