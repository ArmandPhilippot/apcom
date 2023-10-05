import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  it('renders a toggle component', () => {
    render(<ThemeToggle />);
    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Theme:/i,
      })
    ).toBeInTheDocument();
  });
});
