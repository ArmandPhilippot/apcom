import NextImage from 'next/image';
import type { PostData } from './posts-list';

export const introPost1 =
  'Esse et voluptas sapiente modi impedit unde et. Ducimus nulla ea impedit sit placeat nihil assumenda. Rem est fugiat amet quo hic. Corrupti fuga quod animi autem dolorem ullam corrupti vel aut.';

export const introPost2 =
  'Illum quae asperiores quod aut necessitatibus itaque excepturi voluptas. Incidunt exercitationem ullam saepe alias consequatur sed. Quam veniam quaerat voluptatum earum quia quisquam fugiat sed perspiciatis. Et velit saepe est recusandae facilis eos eum ipsum.';

export const introPost3 =
  'Sunt aperiam ut rem impedit dolor id sit. Reprehenderit ipsum iusto fugiat. Quaerat laboriosam magnam facilis. Totam sint aliquam voluptatem in quis laborum sunt eum. Enim aut debitis officiis porro iure quia nihil voluptas ipsum. Praesentium quis necessitatibus cumque quia qui velit quos dolorem.';

export const cover = {
  alt: 'cover',
  height: 480,
  src: 'http://picsum.photos/640/480',
  width: 640,
};

export const posts: PostData[] = [
  {
    cover: <NextImage {...cover} />,
    excerpt: introPost1,
    id: 'post-1',
    meta: {
      publicationDate: '2022-02-26',
      wordsCount: introPost1.split(' ').length,
      thematics: [
        { id: 1, name: 'Cat 1', url: '#' },
        { id: 2, name: 'Cat 2', url: '#' },
      ],
      comments: { count: 1, postHeading: 'Ratione velit fuga' },
    },
    heading: 'Ratione velit fuga',
    url: '#',
  },
  {
    excerpt: introPost2,
    id: 'post-2',
    meta: {
      publicationDate: '2022-02-20',
      wordsCount: introPost2.split(' ').length,
      thematics: [{ id: 2, name: 'Cat 2', url: '#' }],
      comments: { count: 0, postHeading: 'Debitis laudantium laudantium' },
    },
    heading: 'Debitis laudantium laudantium',
    url: '#',
  },
  {
    cover: <NextImage {...cover} />,
    excerpt: introPost3,
    id: 'post-3',
    meta: {
      publicationDate: '2021-12-20',
      wordsCount: introPost3.split(' ').length,
      thematics: [{ id: 1, name: 'Cat 1', url: '#' }],
      comments: { count: 3, postHeading: 'Quaerat ut corporis' },
    },
    heading: 'Quaerat ut corporis',
    url: '#',
  },
];
