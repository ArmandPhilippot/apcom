import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { PrismThemeToggle } from './prism-theme-toggle';

describe('PrismThemeToggle', () => {
  it('renders a toggle component', () => {
    render(<PrismThemeToggle />);
    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Code blocks:/i,
      })
    ).toBeInTheDocument();
  });
});
