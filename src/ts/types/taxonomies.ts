import { ContentInfo, ContentParts, Dates, Slug } from './app';
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
  info: ContentInfo;
  intro: string;
  posts: ArticlePreview[];
  seo: SEO;
  title: string;
};

type TaxonomyPreview = Pick<
  Taxonomy,
  'databaseId' | 'id' | 'info' | 'seo' | 'title'
> & {
  slug: string;
};

//==============================================================================
// Topics
//==============================================================================

export type Topic = Taxonomy & {
  featuredImage: Cover;
  officialWebsite: string;
};

export type RawTopicPreview = TaxonomyPreview & {
  featuredImage: RawCover;
};

export type TopicPreview = TaxonomyPreview & {
  featuredImage: Cover;
};

export type AllTopics = {
  topics: {
    nodes: TopicPreview[];
  };
};

export type RawTopic = TopicPreview & {
  acfTopics: {
    officialWebsite: string;
    postsInTopic: RawArticlePreview[];
  };
  contentParts: ContentParts;
  date: string;
  featuredImage: RawCover;
  modified: string;
};

export type TopicBy = {
  topicBy: RawTopic;
};

export type AllTopicsSlug = {
  topics: {
    nodes: Slug[];
  };
};

export type TopicProps = {
  allTopics: TopicPreview[];
  topic: Topic;
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
  allThematics: ThematicPreview[];
  thematic: Thematic;
};
