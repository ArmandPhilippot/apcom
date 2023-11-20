import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import type { CommentData } from '../../organisms/comments-list';
import { PageComments } from './page-comments';

const comments = [
  {
    author: {
      name: 'Milan0',
      avatar: {
        alt: 'Milan0 avatar',
        src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/976.jpg',
      },
    },
    content: 'Fugit veniam quas qui dolor explicabo.',
    id: 1,
    isApproved: true,
    publicationDate: '2023-01-23',
    replies: [],
  },
  {
    author: {
      name: 'Corrine9',
      avatar: {
        alt: 'Corrine9 avatar',
        src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/539.jpg',
      },
    },
    content:
      'Dolore hic iure voluptatum quam error minima. Quas ut aperiam sit commodi cumque consequatur. Voluptas debitis veritatis officiis in voluptas ea et laborum animi. Voluptatem qui enim neque. Et sunt quo neque assumenda iure. Non vel ut consectetur.',
    id: 2,
    isApproved: true,
    publicationDate: '2023-04-20',
  },
  {
    author: { name: 'Presley12' },
    content:
      'Nulla eaque similique recusandae enim aut eligendi iure consequatur. Et aut qui. Voluptatem a voluptatem consequatur aliquid distinctio ex culpa. Adipisci animi amet reprehenderit autem quia commodi voluptatum commodi.',
    id: 3,
    isApproved: true,
    publicationDate: '2023-05-01',
    replies: [],
  },
  {
    author: { name: 'Julius.Borer' },
    content: 'Ea fugit totam et voluptatum quidem laborum explicabo fuga quod.',
    id: 4,
    isApproved: true,
    publicationDate: '2023-06-15',
  },
  {
    author: { name: 'Geo87' },
    content:
      'Enim consequatur deleniti aliquid adipisci. Et mollitia saepe vel rerum totam praesentium assumenda repellat fuga. Ipsum ut architecto consequatur. Ut laborum suscipit sed corporis quas aliquid. Et et omnis quo. Dolore quia ipsum ut corporis eum et corporis qui.',
    id: 5,
    isApproved: false,
    publicationDate: '2023-06-16',
  },
  {
    author: { name: 'Kurt.Keeling' },
    content: 'Eligendi repellat officiis amet.',
    id: 6,
    isApproved: true,
    publicationDate: '2023-06-17',
  },
] satisfies CommentData[];

describe('PageComments', () => {
  it('renders a list of comments with a form', () => {
    render(<PageComments comments={comments} pageId={1} />);

    const headings = rtlScreen.getAllByRole('heading', { level: 2 });

    expect(headings).toHaveLength(2);
    expect(headings[0]).toHaveTextContent(`${comments.length} comments`);
    expect(headings[1]).toHaveTextContent('Leave a comment');
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(comments.length);
    expect(rtlScreen.getByRole('form')).toHaveAccessibleName('Comment form');
  });

  it('can disable the comment form when comments are closed', () => {
    render(<PageComments areCommentsClosed comments={comments} pageId={1} />);

    expect(rtlScreen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(rtlScreen.queryByRole('form')).not.toBeInTheDocument();
  });

  it('can render a link to the comment form when there are no comments', () => {
    render(<PageComments comments={[]} pageId={1} />);

    expect(
      rtlScreen.getAllByRole('heading', { level: 2 })[0]
    ).toHaveTextContent('No comments');
    expect(rtlScreen.queryByRole('listitem')).not.toBeInTheDocument();

    const formSection = rtlScreen.getByRole('form').parentElement;

    expect(formSection?.id).not.toBeUndefined();
    expect(
      rtlScreen.getByRole('link', { name: 'Be the first!' })
    ).toHaveAttribute('href', `#${formSection?.id}`);
  });
});
