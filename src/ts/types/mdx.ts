import { StaticImageData } from 'next/image';
import { Meta } from './app';

export type MDXData = {
  file: string;
  image: StaticImageData;
};

export type MDXPageMeta = Pick<Meta<'page'>, 'cover' | 'dates' | 'seo'> & {
  intro: string;
  title: string;
};

export type MDXProjectMeta = Omit<
  Meta<'project'>,
  'readingTime' | 'wordsCount'
> & {
  intro: string;
  title: string;
};
