import { render, screen } from '../../../../tests/utils';
import BackToTop from './back-to-top';

describe('BackToTop', () => {
  it('renders a BackToTop link', () => {
    render(<BackToTop target="top" />);
    expect(screen.getByRole('link')).toHaveAccessibleName('Back to top');
    expect(screen.getByRole('link')).toHaveAttribute('href', '#top');
  });
});
