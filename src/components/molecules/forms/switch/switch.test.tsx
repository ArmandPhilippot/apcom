import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Legend } from '../../../atoms';
import { Switch, type SwitchOption } from './switch';

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
      rtlScreen.getByRole('radiogroup', { name: legend })
    ).toBeInTheDocument();
    expect(rtlScreen.getAllByRole('radio')).toHaveLength(items.length);
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

    const radios = rtlScreen.getAllByRole<HTMLInputElement>('radio');
    expect(radios.every((radio) => radio.disabled)).toBe(true);
    expect(rtlScreen.getByRole('radiogroup')).toBeDisabled();
  });
});
