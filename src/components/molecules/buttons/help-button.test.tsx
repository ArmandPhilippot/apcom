import { render, screen } from '@test-utils';
import HelpButton from './help-button';

describe('Help', () => {
  it('renders a help button', () => {
    render(<HelpButton />);
    expect(screen.getByRole('button', { name: 'Help ?' })).toBeInTheDocument();
  });
});
