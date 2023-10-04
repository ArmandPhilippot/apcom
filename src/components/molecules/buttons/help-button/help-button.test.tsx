import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { HelpButton } from './help-button';

describe('Help', () => {
  it('renders a help button', () => {
    const label = 'hic';

    render(<HelpButton label={label} />);

    expect(rtlScreen.getByRole('button')).toHaveAccessibleName(label);
  });
});
