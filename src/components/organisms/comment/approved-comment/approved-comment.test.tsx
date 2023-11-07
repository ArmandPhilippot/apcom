import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { ApprovedComment, type CommentAuthor } from './approved-comment';

describe('ApprovedComment', () => {
  const user = userEvent.setup();

  it('renders the author, the publication date, the comment and a permalink', () => {
    const author = {
      name: 'Delbert_Jacobi45',
    } satisfies CommentAuthor;
    const content = 'Repellat ab non et.';
    const id = 1;
    const publicationDate = '2023';

    render(
      <ApprovedComment
        author={author}
        content={content}
        id={id}
        publicationDate={publicationDate}
      />
    );

    expect(rtlScreen.getByText(author.name)).toBeInTheDocument();
    expect(rtlScreen.getByText(content)).toBeInTheDocument();
    expect(
      rtlScreen.getByText(new RegExp(publicationDate))
    ).toBeInTheDocument();
    expect(rtlScreen.getByRole('link')).toHaveAttribute(
      'href',
      `#comment-${id}`
    );
  });

  it('can render the author avatar', () => {
    const author = {
      avatar: {
        alt: 'enim ut maiores',
        src: 'https://picsum.photos/640/480',
      },
      name: 'Sandra82',
    } satisfies CommentAuthor;

    render(
      <ApprovedComment
        author={author}
        content="Ab qui aliquam esse."
        id={2}
        publicationDate="2022-11-03"
      />
    );

    expect(rtlScreen.getByRole('img')).toHaveAccessibleName(author.avatar.alt);
  });

  it('can render a link to the author website', () => {
    const author = {
      name: 'Esmeralda51',
      website: 'http://example.net',
    } satisfies CommentAuthor;

    render(
      <ApprovedComment
        author={author}
        content="Ab qui aliquam esse."
        id={2}
        publicationDate="2022-11-03"
      />
    );

    expect(rtlScreen.getByRole('link', { name: author.name })).toHaveAttribute(
      'href',
      author.website
    );
  });

  it('can render a reply button', async () => {
    const id = 6;
    const replyBtn = 'dolore recusandae voluptas';
    const handleReply = jest.fn((_id: number) => {
      // do nothing
    });

    render(
      <ApprovedComment
        author={{ name: 'Kurtis5' }}
        content="Ab qui aliquam esse."
        id={id}
        onReply={handleReply}
        publicationDate="2022-11-03"
        replyBtn={replyBtn}
      />
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(rtlScreen.getByRole('button')).toHaveTextContent(replyBtn);
    expect(handleReply).not.toHaveBeenCalled();

    await user.click(rtlScreen.getByRole('button'));

    expect(handleReply).toHaveBeenCalledTimes(1);
    expect(handleReply).toHaveBeenCalledWith(id);
  });
});
