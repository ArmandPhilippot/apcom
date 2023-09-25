import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
import { Legend } from '../../../atoms';
import { Switch, SwitchOption } from './switch';

const doNothing = () => {
  /* Do nothing. */
};

const items: [SwitchOption, SwitchOption] = [
  { id: 'item-1', label: 'Option 1', value: 'option-1' },
  { id: 'item-2', label: 'Option 2', value: 'option-2' },
];

describe('Switch', () => {
  it('renders a radio group with two choices', () => {
    const legend = 'Options:';

    render(
      <Switch
        items={items}
        legend={<Legend>{legend}</Legend>}
        name="possimus"
        onSwitch={doNothing}
        value={items[0].value}
      />
    );

    expect(
      screen.getByRole('radiogroup', { name: legend })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(items.length);
  });

  it('can render a disabled switch', () => {
    render(
      <Switch
        isDisabled
        items={items}
        name="architecto"
        onSwitch={doNothing}
        value={items[1].value}
      />
    );

    const radios = screen.getAllByRole<HTMLInputElement>('radio');
    expect(radios.every((radio) => radio.disabled)).toBe(true);
    expect(screen.getByRole('radiogroup')).toBeDisabled();
  });
});
