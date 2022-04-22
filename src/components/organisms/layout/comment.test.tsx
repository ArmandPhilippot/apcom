import { render, screen } from '@test-utils';
import { getFormattedDate, getFormattedTime } from '@utils/helpers/format';
import Comment from './comment';

const author = {
  avatar: 'http://placeimg.com/640/480',
  name: 'Your name',
  url: 'https://www.example.test/',
};
const content =
  'Harum aut cumque iure fugit neque sequi cupiditate repudiandae laudantium. Ratione aut assumenda qui illum voluptas accusamus quis officiis exercitationem. Consectetur est harum eius perspiciatis officiis nihil. Aut corporis minima debitis adipisci possimus debitis et.';
const publication = '2021-04-03 23:04:24';
const id = 5;

const data = {
  author,
  content,
  id,
  publication,
  saveComment: () => null,
};

const formattedDate = getFormattedDate(publication);
const formattedTime = getFormattedTime(publication);

describe('Comment', () => {
  it('renders an avatar', () => {
    render(<Comment {...data} />);
    expect(
      screen.getByRole('img', { name: 'Your name avatar' })
    ).toBeInTheDocument();
  });

  it('renders the author website url', () => {
    render(<Comment {...data} />);
    expect(screen.getByRole('link', { name: author.name })).toHaveAttribute(
      'href',
      author.url
    );
  });

  it('renders a permalink to the comment', () => {
    render(<Comment {...data} />);
    expect(
      screen.getByRole('link', {
        name: `${formattedDate} at ${formattedTime}`,
      })
    ).toHaveAttribute('href', `/#comment-${id}`);
  });

  it('renders a reply button', () => {
    render(<Comment {...data} canReply={true} />);
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });

  it('does not render a reply button', () => {
    render(<Comment {...data} canReply={false} />);
    expect(
      screen.queryByRole('button', { name: 'Reply' })
    ).not.toBeInTheDocument();
  });
});
