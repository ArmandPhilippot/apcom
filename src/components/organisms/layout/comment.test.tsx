import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { UserComment } from './comment';
import {
  author,
  data,
  formattedDate,
  formattedTime,
  id,
} from './comment.fixture';

describe('UserComment', () => {
  it('renders an avatar', () => {
    render(<UserComment canReply={true} {...data} />);
    expect(
      rtlScreen.getByRole('img', { name: author.avatar.alt })
    ).toBeInTheDocument();
  });

  it('renders the author website url', () => {
    render(<UserComment canReply={true} {...data} />);
    expect(rtlScreen.getByRole('link', { name: author.name })).toHaveAttribute(
      'href',
      author.website
    );
  });

  it('renders a permalink to the comment', () => {
    render(<UserComment canReply={true} {...data} />);
    expect(
      rtlScreen.getByRole('link', {
        name: `${formattedDate} at ${formattedTime}`,
      })
    ).toHaveAttribute('href', `#comment-${id}`);
  });

  it('renders a reply button', () => {
    render(<UserComment canReply={true} {...data} />);
    expect(
      rtlScreen.getByRole('button', { name: 'Reply' })
    ).toBeInTheDocument();
  });

  it('does not render a reply button', () => {
    render(<UserComment canReply={false} {...data} />);
    expect(
      rtlScreen.queryByRole('button', { name: 'Reply' })
    ).not.toBeInTheDocument();
  });
});
