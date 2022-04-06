import { render, screen } from '@test-utils';
import Modal from './modal';

describe('Modal', () => {
  it('renders a title', () => {
    render(<Modal title="A custom title" />);
    expect(screen.getByText('A custom title')).toBeInTheDocument();
  });
});
