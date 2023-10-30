import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../../tests/utils';
import { PrismThemeProvider } from '../../../../../utils/providers';
import { PrismThemeToggle } from './prism-theme-toggle';

describe('PrismThemeToggle', () => {
  it('renders a radio group of two radio buttons', () => {
    const defaultTheme = 'dark';

    render(
      <PrismThemeProvider
        attribute="fuga"
        storageKey="sed"
        defaultTheme={defaultTheme}
      >
        <PrismThemeToggle />
      </PrismThemeProvider>
    );

    expect(
      rtlScreen.getByRole('radiogroup', {
        name: /Code blocks:/i,
      })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radio')).toHaveLength(2);
  });
});
