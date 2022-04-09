import { render, screen } from '@test-utils';
import Checkbox from './checkbox';

describe('Checkbox', () => {
  it('renders an unchecked checkbox', () => {
    render(
      <Checkbox
        id="jest-checkbox"
        name="jest-checkbox"
        value={false}
        setValue={() => null}
      />
    );
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox', () => {
    render(
      <Checkbox
        id="jest-checkbox"
        name="jest-checkbox"
        value={true}
        setValue={() => null}
      />
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
