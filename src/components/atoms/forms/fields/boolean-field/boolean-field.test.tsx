import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../../tests/utils';
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
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
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
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
