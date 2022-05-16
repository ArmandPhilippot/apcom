export type ContentKind =
  | 'article'
  | 'comment'
  | 'page'
  | 'project'
  | 'thematic'
  | 'topic';

export type Author<T extends ContentKind> = {
  avatar?: Image;
  description?: T extends 'comment' ? never : string;
  name: string;
  website?: string;
};

export type CommentMeta = {
  author: Author<'comment'>;
  date: string;
};

export type Comment = {
  approved: boolean;
  content: string;
  id: number;
  meta: CommentMeta;
  parentId: number;
  replies: Comment[];
};

export type Dates = {
  publication: string;
  update?: string;
};

export type Image = {
  alt: string;
  height: number;
  src: string;
  title?: string;
  width: number;
};

export type Repos = {
  github?: string;
  gitlab?: string;
};

export type SEO = {
  description: string;
  title: string;
};

export type PageKind = Exclude<ContentKind, 'comment'>;

export type Meta<T extends PageKind> = {
  articles?: T extends 'thematic' | 'topic' ? Article[] : never;
  author?: T extends 'article' | 'page' ? Author<T> : never;
  commentsCount?: T extends 'article' ? number : never;
  cover?: Image;
  dates: Dates;
  license?: T extends 'project' ? string : never;
  readingTime?: number;
  repos?: T extends 'project' ? Repos : never;
  seo: SEO;
  tagline?: T extends 'project' ? string : never;
  technologies?: T extends 'project' ? string[] : never;
  thematics?: T extends 'article' | 'topic' ? PageLink[] : never;
  topics?: T extends 'article' | 'thematic' ? PageLink[] : never;
  website?: T extends 'topic' ? string : never;
  wordsCount?: number;
};

export type Page<T extends PageKind> = {
  content: string;
  id: number | string;
  intro: string;
  meta: Meta<T>;
  slug: string;
  title: string;
};

export type PageLink = {
  id: number;
  logo?: Image;
  name: string;
  slug: string;
};

export type Article = Page<'article'>;
export type ArticleCard = Pick<Article, 'id' | 'slug' | 'title'> &
  Pick<Meta<'article'>, 'cover' | 'dates'>;
export type Project = Page<'project'>;
export type ProjectPreview = Omit<Page<'project'>, 'content'>;
export type ProjectCard = Pick<Page<'project'>, 'id' | 'slug' | 'title'> & {
  meta: Pick<Meta<'project'>, 'cover' | 'dates' | 'tagline' | 'technologies'>;
};
export type Thematic = Page<'thematic'>;
export type Topic = Page<'topic'>;

export type Slug = {
  slug: string;
};
