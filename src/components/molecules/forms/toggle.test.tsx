import { render, screen } from '@test-utils';
import Toggle from './toggle';

const choices = {
  left: 'On',
  right: 'Off',
};

const label = 'Activate this setting:';

describe('Toggle', () => {
  it('renders a checked toggle', () => {
    render(
      <Toggle
        id="toggle-example"
        name="toggle-example"
        choices={choices}
        label={label}
        value={true}
        setValue={(__value) => null}
      />
    );
    expect(
      screen.getByRole('checkbox', {
        name: `${label} ${choices.left} ${choices.right}`,
      })
    ).toBeChecked();
  });
});
