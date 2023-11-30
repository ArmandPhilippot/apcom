import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { LoadingPage } from './loading-page';

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    render(<LoadingPage />);

    expect(
      rtlScreen.getByText('The requested page is loading...')
    ).toBeInTheDocument();
  });
});
