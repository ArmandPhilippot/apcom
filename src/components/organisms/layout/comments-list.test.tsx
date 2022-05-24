import { render } from '@test-utils';
import { saveComment } from './comment.fixture';
import CommentsList from './comments-list';
import { comments } from './comments-list.fixture';

describe('CommentsList', () => {
  it('renders a comments list', () => {
    render(
      <CommentsList comments={comments} depth={1} saveComment={saveComment} />
    );
  });
});
