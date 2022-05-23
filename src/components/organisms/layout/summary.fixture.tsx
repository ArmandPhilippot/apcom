import { type SummaryMeta } from './summary';

export const cover = {
  alt: 'A cover',
  height: 480,
  src: 'http://placeimg.com/640/480',
  width: 640,
};

export const intro =
  'Perspiciatis quasi libero nemo non eligendi nam minima. Deleniti expedita tempore. Praesentium explicabo molestiae eaque consectetur vero. Quae nostrum quisquam similique. Ut hic est quas ut esse quisquam nobis.';

export const meta: SummaryMeta = {
  dates: { publication: '2022-04-11' },
  wordsCount: intro.split(' ').length,
  thematics: [
    { id: 1, name: 'Cat 1', slug: '#' },
    { id: 2, name: 'Cat 2', slug: '#' },
  ],
  commentsCount: 1,
};

export const title = 'Odio odit necessitatibus';

export const url = '#';
