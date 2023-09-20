import { render, screen } from '../../../../tests/utils';
import { Comment } from './comment';
import {
  author,
  data,
  formattedDate,
  formattedTime,
  id,
} from './comment.fixture';

describe('Comment', () => {
  it('renders an avatar', () => {
    render(<Comment canReply={true} {...data} />);
    expect(
      screen.getByRole('img', { name: author.avatar.alt })
    ).toBeInTheDocument();
  });

  it('renders the author website url', () => {
    render(<Comment canReply={true} {...data} />);
    expect(screen.getByRole('link', { name: author.name })).toHaveAttribute(
      'href',
      author.website
    );
  });

  it('renders a permalink to the comment', () => {
    render(<Comment canReply={true} {...data} />);
    expect(
      screen.getByRole('link', {
        name: `${formattedDate} at ${formattedTime}`,
      })
    ).toHaveAttribute('href', `#comment-${id}`);
  });

  it('renders a reply button', () => {
    render(<Comment canReply={true} {...data} />);
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });

  it('does not render a reply button', () => {
    render(<Comment canReply={false} {...data} />);
    expect(
      screen.queryByRole('button', { name: 'Reply' })
    ).not.toBeInTheDocument();
  });
});
