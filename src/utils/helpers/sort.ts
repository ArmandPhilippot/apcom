import { ArticlePreview } from '@ts/types/articles';
import { PostsList } from '@ts/types/blog';

type YearCollection = {
  [key: string]: ArticlePreview[];
};

export const sortPostsByYear = (data: PostsList[]) => {
  const yearCollection: YearCollection = {};

  data.forEach((page) => {
    page.posts.forEach((post) => {
      const postYear = new Date(post.date.publication).getFullYear().toString();
      yearCollection[postYear] = [...(yearCollection[postYear] || []), post];
    });
  });

  return yearCollection;
};
