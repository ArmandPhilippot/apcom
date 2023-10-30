import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../../tests/utils';
import { ThemeProvider } from '../../../../../utils/providers';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  it('renders a radio group of two radio buttons', () => {
    const defaultTheme = 'dark';

    render(
      <ThemeProvider
        attribute="voluptas"
        storageKey="alias"
        defaultTheme={defaultTheme}
      >
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Theme:/i,
      })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radio')).toHaveLength(2);
  });
});
