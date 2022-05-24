import { render, screen } from '@test-utils';
import PageFooter from './page-footer';

describe('PageFooter', () => {
  it('renders a footer element', () => {
    render(<PageFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
