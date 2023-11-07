import { describe, it } from '@jest/globals';
import { render } from '../../../../tests/utils';
import { CommentsList } from './comments-list';
import { comments, saveComment } from './comments-list.fixture';

describe('CommentsList', () => {
  it('renders a comments list', () => {
    render(
      <CommentsList comments={comments} depth={1} onSubmit={saveComment} />
    );
  });
});
