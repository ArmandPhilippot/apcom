import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../../tests/utils';
import { Radio } from './radio';

const doNothing = () => {
  // Do nothing
};

describe('Radio', () => {
  it('renders an unchecked radio', () => {
    render(
      <Radio id="radio" name="radio" onChange={doNothing} value="radio" />
    );
    expect(screen.getByRole('radio')).not.toBeChecked();
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
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
