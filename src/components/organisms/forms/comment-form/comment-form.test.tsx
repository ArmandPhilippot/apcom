import { render, screen } from '../../../../../tests/utils';
import { CommentForm } from './comment-form';

const saveComment = async () => {
  /** Do nothing. */
};
const title = 'Cum voluptas voluptatibus';

describe('CommentForm', () => {
  it('renders a form', () => {
    render(<CommentForm saveComment={saveComment} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('renders an optional title', () => {
    render(
      <CommentForm saveComment={saveComment} title={title} titleLevel={2} />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });
});
