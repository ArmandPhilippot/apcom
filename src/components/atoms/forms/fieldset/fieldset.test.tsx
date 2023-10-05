import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
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
    expect(rtlScreen.getByRole('group')).toBeInTheDocument();
    expect(rtlScreen.getByRole('textbox')).not.toBeDisabled();
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
    expect(rtlScreen.getByRole('group')).toBeInTheDocument();
    expect(rtlScreen.getByRole('textbox')).toBeDisabled();
  });
});
