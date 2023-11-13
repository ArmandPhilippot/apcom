import { describe, expect, it, jest } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { type PostData, PostsList } from './posts-list';

const posts = [
  {
    excerpt:
      'Omnis voluptatem et sit sit porro possimus quo rerum. Natus et sint cupiditate magnam omnis a consequuntur reprehenderit. Ex omnis voluptatem itaque id laboriosam qui dolorum facilis architecto. Impedit aliquid et qui quae dolorum accusamus rerum.',
    heading: 'Post 1',
    id: 'post1',
    meta: { publicationDate: '2023-11-06' },
    url: '#post1',
  },
  {
    excerpt:
      'Nobis omnis excepturi deserunt laudantium unde totam quam. Voluptates maiores minima voluptatem nihil ea voluptatem similique. Praesentium ratione necessitatibus et et dolore voluptas illum dignissimos ipsum. Eius tempore ex.',
    heading: 'Post 2',
    id: 'post2',
    meta: { publicationDate: '2023-02-05' },
    url: '#post2',
  },
  {
    excerpt:
      'Doloremque est dolorum explicabo. Laudantium quos delectus odit esse fugit officiis. Fugit provident vero harum atque. Eos nam qui sit ut minus voluptas. Reprehenderit rerum ut nostrum. Eos dolores mollitia quia ea voluptatem rerum vel.',
    heading: 'Post 3',
    id: 'post3',
    meta: { publicationDate: '2022-10-04' },
    url: '#post3',
  },
] satisfies PostData[];

describe('PostsList', () => {
  it('renders a list of posts', () => {
    render(<PostsList posts={posts} />);

    expect(rtlScreen.getAllByRole('article')).toHaveLength(posts.length);
  });

  it('can render a list of posts divided by year in sections', () => {
    const yearHeadingLvl = 2;
    const yearCount = new Set(
      posts.map((post) => post.meta.publicationDate.split('-')[0])
    ).size;

    render(<PostsList headingLvl={yearHeadingLvl} posts={posts} sortByYear />);

    expect(
      rtlScreen.getAllByRole('heading', { level: yearHeadingLvl })
    ).toHaveLength(yearCount);
    expect(
      rtlScreen.getAllByRole('heading', { level: yearHeadingLvl + 1 })
    ).toHaveLength(posts.length);
  });

  it('can render a load more button', async () => {
    const loadMore = jest.fn();
    const user = userEvent.setup();

    render(<PostsList onLoadMore={loadMore} posts={posts} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(loadMore).not.toHaveBeenCalled();

    const loadMoreBtn = rtlScreen.getByRole('button', { name: /Load more/ });

    expect(loadMoreBtn).toBeInTheDocument();

    await user.click(loadMoreBtn);

    expect(loadMore).toHaveBeenCalledTimes(1);
  });
});
