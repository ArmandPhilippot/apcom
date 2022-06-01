import { render, screen } from '@tests/utils';
import Spinner from './spinner';

describe('Spinner', () => {
  it('renders a spinner loader', () => {
    render(<Spinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a spinner loader with a custom message', () => {
    render(<Spinner message="Submitting" />);
    expect(screen.getByText('Submitting')).toBeInTheDocument();
  });
});
