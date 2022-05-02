export type AuthorKind = 'page' | 'comment';

export type Author<T extends AuthorKind> = {
  avatar?: Image;
  description?: T extends 'page' ? string | undefined : never;
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
  update: string;
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

export type PageKind = 'article' | 'project' | 'thematic' | 'topic';

export type Meta<T extends PageKind> = {
  articles?: T extends 'thematic' | 'topic' ? Article[] : never;
  author: Author<'page'>;
  commentsCount?: T extends 'article' ? number : never;
  cover?: Image;
  dates: Dates;
  license?: T extends 'projects' ? string : never;
  readingTime: number;
  repos?: T extends 'projects' ? Repos : never;
  seo: SEO;
  technologies?: T extends 'projects' ? string[] : never;
  thematics?: T extends 'article' | 'topic' ? PageLink[] : never;
  topics?: T extends 'article' | 'thematic' ? PageLink[] : never;
  website?: T extends 'topic' ? string : never;
  wordsCount: number;
};

export type Page<T extends PageKind> = {
  content: string;
  id: number;
  intro: string;
  meta?: Meta<T>;
  slug: string;
  title: string;
};

export type PageLink = {
  id: number;
  name: string;
  slug: string;
};

export type Article = Page<'article'>;
export type ArticleCard = Pick<Article, 'id' | 'slug' | 'title'> &
  Pick<Meta<'article'>, 'cover' | 'dates'>;
export type Project = Page<'project'>;
export type Thematic = Page<'thematic'>;
export type Topic = Page<'topic'>;
