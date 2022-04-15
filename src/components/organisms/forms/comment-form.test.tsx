import { render, screen } from '@test-utils';
import CommentForm from './comment-form';

const title = 'Cum voluptas voluptatibus';

describe('CommentForm', () => {
  it('renders a form', () => {
    render(<CommentForm saveComment={() => null} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders an optional title', () => {
    render(
      <CommentForm saveComment={() => null} title={title} titleLevel={2} />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });
});
