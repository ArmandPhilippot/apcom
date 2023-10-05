import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Checkbox } from './checkbox';

const doNothing = () => {
  // Do nothing
};

describe('Checkbox', () => {
  it('renders an unchecked checkbox', () => {
    render(
      <Checkbox
        id="checkbox"
        name="checkbox"
        onChange={doNothing}
        value="checkbox"
      />
    );
    expect(rtlScreen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox', () => {
    render(
      <Checkbox
        id="checkbox"
        isChecked
        name="checkbox"
        onChange={doNothing}
        value="checkbox"
      />
    );
    expect(rtlScreen.getByRole('checkbox')).toBeChecked();
  });
});
