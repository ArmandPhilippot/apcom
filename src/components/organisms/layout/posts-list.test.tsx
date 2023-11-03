import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { PostsList } from './posts-list';
import { posts } from './posts-list.fixture';

describe('PostsList', () => {
  it('renders the correct number of posts', () => {
    render(<PostsList posts={posts} total={posts.length} />);
    expect(rtlScreen.getAllByRole('article')).toHaveLength(posts.length);
  });

  it('renders the number of loaded posts', () => {
    render(<PostsList posts={posts} total={posts.length} />);
    const info = `${posts.length} loaded articles out of a total of ${posts.length}`;
    expect(rtlScreen.getByText(info)).toBeInTheDocument();
  });

  it('renders a load more button', () => {
    render(
      <PostsList posts={posts} total={posts.length} showLoadMoreBtn={true} />
    );
    expect(
      rtlScreen.getByRole('button', { name: /Load more/i })
    ).toBeInTheDocument();
  });

  it('renders a search form if no results', () => {
    render(<PostsList posts={[]} total={0} showLoadMoreBtn={true} />);
    expect(rtlScreen.getByRole('searchbox')).toBeInTheDocument();
  });
});
