import { render, screen } from '../../../../tests/utils';
import BooleanField from './boolean-field';

describe('BooleanField', () => {
  it('renders an unchecked checkbox', () => {
    render(
      <BooleanField
        checked={false}
        id="jest-checkbox"
        name="jest-checkbox"
        onChange={() => null}
        type="checkbox"
        value="checkbox"
      />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox', () => {
    render(
      <BooleanField
        checked={true}
        id="jest-checkbox"
        name="jest-checkbox"
        onChange={() => null}
        type="checkbox"
        value="checkbox"
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders an unchecked radio', () => {
    render(
      <BooleanField
        checked={false}
        id="jest-radio"
        name="jest-radio"
        onChange={() => null}
        type="radio"
        value="radio"
      />
    );
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('renders a checked radio', () => {
    render(
      <BooleanField
        checked={true}
        id="jest-radio"
        name="jest-radio"
        onChange={() => null}
        type="radio"
        value="radio"
      />
    );
    expect(screen.getByRole('radio')).toBeChecked();
  });
});
