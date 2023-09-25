import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { PostsList } from './posts-list';
import { posts, searchPage } from './posts-list.fixture';

describe('PostsList', () => {
  it('renders the correct number of posts', () => {
    render(
      <PostsList posts={posts} total={posts.length} searchPage={searchPage} />
    );
    expect(screen.getAllByRole('article')).toHaveLength(posts.length);
  });

  it('renders the number of loaded posts', () => {
    render(
      <PostsList posts={posts} total={posts.length} searchPage={searchPage} />
    );
    const info = `${posts.length} loaded articles out of a total of ${posts.length}`;
    expect(screen.getByText(info)).toBeInTheDocument();
  });

  it('renders a load more button', () => {
    render(
      <PostsList
        posts={posts}
        total={posts.length}
        showLoadMoreBtn={true}
        searchPage={searchPage}
      />
    );
    expect(
      screen.getByRole('button', { name: /Load more/i })
    ).toBeInTheDocument();
  });

  it('renders a search form if no results', () => {
    render(
      <PostsList
        posts={[]}
        total={0}
        showLoadMoreBtn={true}
        searchPage={searchPage}
      />
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
