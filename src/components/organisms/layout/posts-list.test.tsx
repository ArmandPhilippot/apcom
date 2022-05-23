import { render, screen } from '@test-utils';
import PostsList from './posts-list';
import { posts } from './posts-list.fixture';

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
