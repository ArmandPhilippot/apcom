import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
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
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });
});
