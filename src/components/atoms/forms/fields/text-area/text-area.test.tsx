import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { TextArea } from './text-area';

const doNothing = () => {
  // do nothing
};

describe('TextArea', () => {
  it('renders a textarea', () => {
    render(
      <TextArea
        id="textarea-field"
        name="textarea-field"
        onChange={doNothing}
        value=""
      />
    );
    expect(rtlScreen.getByRole('textbox')).toBeInTheDocument();
  });
});
