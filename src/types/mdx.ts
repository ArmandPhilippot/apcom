import { StaticImageData } from 'next/image';
import { Meta } from './app';

export type MDXData = {
  file: string;
  image: MDXImage;
};

export type MDXImage = StaticImageData & {
  alt: string;
  title?: string;
};

export type MDXPageMeta = Pick<Meta<'page'>, 'cover' | 'dates' | 'seo'> & {
  intro: string;
  title: string;
};

export type MDXProjectMeta = Exclude<Meta<'project'>, 'wordsCount'> & {
  intro: string;
  title: string;
};
