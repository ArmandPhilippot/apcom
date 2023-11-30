import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { LoadingPageComments } from './loading-page-comments';

describe('LoadingPageComments', () => {
  it('renders a spinner', () => {
    render(<LoadingPageComments />);

    expect(
      rtlScreen.getByText('The comments are loading...')
    ).toBeInTheDocument();
  });
});
