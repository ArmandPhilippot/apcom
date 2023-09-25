import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { HelpButton } from './help-button';

describe('Help', () => {
  it('renders a help button', () => {
    render(<HelpButton />);
    expect(screen.getByRole('button', { name: 'Help ?' })).toBeInTheDocument();
  });
});
