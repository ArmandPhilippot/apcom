import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { PendingComment } from './pending-comment';

describe('PendingComment', () => {
  it('renders a text to inform user', () => {
    render(<PendingComment />);

    expect(
      rtlScreen.getByText('This comment is awaiting moderation…')
    ).toBeInTheDocument();
  });
});
