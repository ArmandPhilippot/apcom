import Copyright from '@components/Copyright/Copyright';
import { render, screen } from '@test-utils';
import '../__mocks__/matchMedia.mock';

describe('Copyright', () => {
  it('renders the Copyright component', () => {
    render(<Copyright />);
  });

  it('displays author name', () => {
    render(<Copyright />);
    expect(screen.getByText('Armand Philippot')).toBeInTheDocument();
  });
});
