import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Radio } from './radio';

const doNothing = () => {
  // Do nothing
};

describe('Radio', () => {
  it('renders an unchecked radio', () => {
    render(
      <Radio id="radio" name="radio" onChange={doNothing} value="radio" />
    );
    expect(rtlScreen.getByRole('radio')).not.toBeChecked();
  });

  it('renders a checked radio', () => {
    render(
      <Radio
        id="radio"
        isChecked
        name="radio"
        onChange={doNothing}
        value="radio"
      />
    );
    expect(rtlScreen.getByRole('radio')).toBeChecked();
  });
});
