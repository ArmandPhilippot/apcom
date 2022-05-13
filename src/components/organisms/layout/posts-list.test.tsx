import { render, screen } from '@test-utils';
import PostsList, { Post } from './posts-list';

const excerpt1 =
  'Esse et voluptas sapiente modi impedit unde et. Ducimus nulla ea impedit sit placeat nihil assumenda. Rem est fugiat amet quo hic. Corrupti fuga quod animi autem dolorem ullam corrupti vel aut.';
const excerpt2 =
  'Illum quae asperiores quod aut necessitatibus itaque excepturi voluptas. Incidunt exercitationem ullam saepe alias consequatur sed. Quam veniam quaerat voluptatum earum quia quisquam fugiat sed perspiciatis. Et velit saepe est recusandae facilis eos eum ipsum.';
const excerpt3 =
  'Sunt aperiam ut rem impedit dolor id sit. Reprehenderit ipsum iusto fugiat. Quaerat laboriosam magnam facilis. Totam sint aliquam voluptatem in quis laborum sunt eum. Enim aut debitis officiis porro iure quia nihil voluptas ipsum. Praesentium quis necessitatibus cumque quia qui velit quos dolorem.';

const posts: Post[] = [
  {
    excerpt: excerpt1,
    id: 'post-1',
    meta: {
      dates: { publication: '2022-02-26' },
      readingTime: { wordsCount: excerpt1.split(' ').length },
      thematics: [
        { id: 'cat-1', name: 'Cat 1', url: '#' },
        { id: 'cat-2', name: 'Cat 2', url: '#' },
      ],
      commentsCount: 1,
    },
    title: 'Ratione velit fuga',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
    },
  },
  {
    excerpt: excerpt2,
    id: 'post-2',
    meta: {
      dates: { publication: '2022-02-20' },
      readingTime: { wordsCount: excerpt2.split(' ').length },
      thematics: [{ id: 'cat-2', name: 'Cat 2', url: '#' }],
      commentsCount: 0,
    },
    title: 'Debitis laudantium laudantium',
    url: '#',
  },
  {
    excerpt: excerpt3,
    id: 'post-3',
    meta: {
      dates: { publication: '2021-12-20' },
      readingTime: { wordsCount: excerpt3.split(' ').length },
      thematics: [{ id: 'cat-1', name: 'Cat 1', url: '#' }],
      commentsCount: 3,
    },
    title: 'Quaerat ut corporis',
    url: '#',
    cover: {
      alt: 'cover',
      height: 480,
      src: 'http://placeimg.com/640/480',
      width: 640,
      // @ts-ignore - Needed because of the placeholder image.
      unoptimized: true,
    },
  },
];

describe('PostsList', () => {
  it('renders the correct number of posts', () => {
    render(<PostsList posts={posts} total={posts.length} />);
    expect(screen.getAllByRole('article')).toHaveLength(posts.length);
  });

  it('renders the number of loaded posts', () => {
    render(<PostsList posts={posts} total={posts.length} />);
    const info = `${posts.length} loaded articles out of a total of ${posts.length}`;
    expect(screen.getByText(info)).toBeInTheDocument();
  });

  it('renders a load more button', () => {
    render(
      <PostsList posts={posts} total={posts.length} showLoadMoreBtn={true} />
    );
    expect(
      screen.getByRole('button', { name: /Load more/i })
    ).toBeInTheDocument();
  });
});
