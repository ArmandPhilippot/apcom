import { render, screen } from '../../../../tests/utils';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders a logo with a title', () => {
    render(<Logo title="My title" />);
    expect(screen.getByTitle('My title')).toBeInTheDocument();
  });
});
