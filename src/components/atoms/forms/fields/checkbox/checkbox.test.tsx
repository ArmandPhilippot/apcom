import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../../tests/utils';
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
    expect(screen.getByRole('checkbox')).not.toBeChecked();
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
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
