import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { type CommentData, CommentsList } from './comments-list';

describe('CommentsList', () => {
  it('renders a list of approved comments', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
      },
      {
        author: { name: 'Haskell42' },
        content: 'Error quas accusamus nesciunt enim quae a.',
        id: 2,
        isApproved: true,
        publicationDate: '2023-02-04',
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(comments.length);
    expect(rtlScreen.getByText(comments[0].author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[0].content)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[1].author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[1].content)).toBeInTheDocument();
  });

  it('renders a list of pending comments', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: false,
        publicationDate: '2023-01-23',
      },
      {
        author: { name: 'Haskell42' },
        content: 'Error quas accusamus nesciunt enim quae a.',
        id: 2,
        isApproved: false,
        publicationDate: '2023-02-04',
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(comments.length);
    expect(
      rtlScreen.queryByText(comments[0].author.name)
    ).not.toBeInTheDocument();
    expect(rtlScreen.queryByText(comments[0].content)).not.toBeInTheDocument();
    expect(
      rtlScreen.queryByText(comments[1].author.name)
    ).not.toBeInTheDocument();
    expect(rtlScreen.queryByText(comments[1].content)).not.toBeInTheDocument();
  });

  it('renders a mixed list of approved and pending comments', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
      },
      {
        author: { name: 'Haskell42' },
        content: 'Error quas accusamus nesciunt enim quae a.',
        id: 2,
        isApproved: false,
        publicationDate: '2023-02-04',
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(comments.length);
    expect(rtlScreen.getByText(comments[0].author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[0].content)).toBeInTheDocument();
    expect(
      rtlScreen.queryByText(comments[1].author.name)
    ).not.toBeInTheDocument();
    expect(rtlScreen.queryByText(comments[1].content)).not.toBeInTheDocument();
  });

  it('does not render the replies by default', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
        replies: [
          {
            author: { name: 'Haskell42' },
            content: 'Error quas accusamus nesciunt enim quae a.',
            id: 2,
            isApproved: true,
            publicationDate: '2023-02-04',
          },
          {
            author: { name: 'Hanna49' },
            content:
              'Ut ducimus neque aliquam soluta sed totam commodi cum sit.',
            id: 3,
            isApproved: true,
            publicationDate: '2023-03-10',
          },
        ],
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} />);

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(1);
    expect(rtlScreen.getByText(comments[0].author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[0].content)).toBeInTheDocument();
    expect(
      rtlScreen.queryByText(comments[0].replies[0].author.name)
    ).not.toBeInTheDocument();
    expect(
      rtlScreen.queryByText(comments[0].replies[0].content)
    ).not.toBeInTheDocument();
    expect(rtlScreen.queryByText(/Reply/)).not.toBeInTheDocument();
  });

  it('can render the replies by providing a depth', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
        replies: [
          {
            author: { name: 'Haskell42' },
            content: 'Error quas accusamus nesciunt enim quae a.',
            id: 2,
            isApproved: true,
            publicationDate: '2023-02-04',
          },
          {
            author: { name: 'Hanna49' },
            content:
              'Ut ducimus neque aliquam soluta sed totam commodi cum sit.',
            id: 3,
            isApproved: true,
            publicationDate: '2023-03-10',
          },
        ],
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} depth={1} />);

    const totalComments =
      comments.length +
      comments.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.replies.length,
        0
      );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(totalComments);
    expect(rtlScreen.getByText(comments[0].author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(comments[0].content)).toBeInTheDocument();
    expect(
      rtlScreen.getByText(comments[0].replies[0].author.name)
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByText(comments[0].replies[0].content)
    ).toBeInTheDocument();
    expect(rtlScreen.getByText(/Reply/)).toBeInTheDocument();
  });

  it('can allow replies on replies by providing a depth', () => {
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
        replies: [
          {
            author: { name: 'Haskell42' },
            content: 'Error quas accusamus nesciunt enim quae a.',
            id: 2,
            isApproved: true,
            publicationDate: '2023-02-04',
          },
          {
            author: { name: 'Hanna49' },
            content:
              'Ut ducimus neque aliquam soluta sed totam commodi cum sit.',
            id: 3,
            isApproved: true,
            publicationDate: '2023-03-10',
          },
        ],
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} depth={3} />);

    const totalComments =
      comments.length +
      comments.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.replies.length,
        0
      );

    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(totalComments);
    expect(rtlScreen.getAllByText(/Reply/)).toHaveLength(totalComments);
  });

  it('can render a reply form when clicking on the reply button', async () => {
    const user = userEvent.setup();
    const comments = [
      {
        author: { name: 'Milan0' },
        content: 'Fugit veniam quas qui dolor explicabo.',
        id: 1,
        isApproved: true,
        publicationDate: '2023-01-23',
      },
      {
        author: { name: 'Haskell42' },
        content: 'Error quas accusamus nesciunt enim quae a.',
        id: 2,
        isApproved: true,
        publicationDate: '2023-02-04',
      },
    ] satisfies CommentData[];

    render(<CommentsList comments={comments} depth={2} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    const replyButtons = rtlScreen.getAllByText(/Reply/);

    expect(rtlScreen.queryByRole('form')).not.toBeInTheDocument();

    await user.click(replyButtons[0]);

    expect(rtlScreen.getByRole('form')).toHaveAccessibleName(/Leave a reply/);

    await user.click(replyButtons[0]);

    expect(rtlScreen.queryByRole('form')).not.toBeInTheDocument();
  });
});
