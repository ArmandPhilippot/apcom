import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { CommentForm } from './comment-form';

const saveComment = async () => {
  /** Do nothing. */
};
const title = 'Cum voluptas voluptatibus';

describe('CommentForm', () => {
  it('renders a form', () => {
    render(<CommentForm saveComment={saveComment} />);
    expect(rtlScreen.getByRole('form')).toBeInTheDocument();
  });

  it('renders an optional title', () => {
    render(
      <CommentForm saveComment={saveComment} title={title} titleLevel={2} />
    );
    expect(
      rtlScreen.getByRole('heading', { level: 2, name: title })
    ).toBeInTheDocument();
  });
});
