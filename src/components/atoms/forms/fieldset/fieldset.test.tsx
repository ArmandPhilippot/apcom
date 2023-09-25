import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../../tests/utils';
import { Input } from '../fields';
import { Fieldset } from './fieldset';

describe('fieldset', () => {
  it('renders a fieldset', () => {
    render(
      <Fieldset>
        <Input
          aria-label="A field example"
          id="field"
          name="field"
          type="text"
        />
      </Fieldset>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toBeDisabled();
  });

  it('renders a disabled fieldset', () => {
    render(
      <Fieldset isDisabled>
        <Input
          aria-label="A field example"
          id="field"
          name="field"
          type="text"
        />
      </Fieldset>
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
