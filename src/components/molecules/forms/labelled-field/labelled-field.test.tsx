import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Input, Label } from '../../../atoms';
import { LabelledField } from './labelled-field';

const doNothing = () => {
  // Do nothing
};

describe('LabelledField', () => {
  it('renders a labelled field', () => {
    const id = 'enim';
    const label = 'eum aliquam culpa';
    const value = 'vitae';

    render(
      <LabelledField
        field={
          <Input
            id={id}
            name="text-field"
            onChange={doNothing}
            type="text"
            value={value}
          />
        }
        label={<Label htmlFor={id}>{label}</Label>}
      />
    );
    expect(rtlScreen.getByLabelText(label)).toBeInTheDocument();
    expect(rtlScreen.getByRole('textbox')).toHaveValue(value);
  });
});
