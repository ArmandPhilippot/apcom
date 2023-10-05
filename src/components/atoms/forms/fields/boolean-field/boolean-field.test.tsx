import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { BooleanField } from './boolean-field';

const handleChange = () => {
  /**
   * Do nothing.
   */
};

describe('boolean field', () => {
  it('renders a checkbox', () => {
    render(
      <BooleanField
        id="checkbox"
        name="checkbox"
        onChange={handleChange}
        type="checkbox"
        value="checkbox"
      />
    );
    expect(rtlScreen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a radio button', () => {
    render(
      <BooleanField
        id="radio"
        name="radio"
        onChange={handleChange}
        type="radio"
        value="checkbox"
      />
    );
    expect(rtlScreen.getByRole('radio')).toBeInTheDocument();
  });
});
