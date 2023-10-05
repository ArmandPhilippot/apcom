import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Fieldset } from '../fieldset';
import { Legend } from './legend';

describe('legend', () => {
  it('renders the fieldset legend', () => {
    const body = 'deserunt';

    render(
      <Fieldset>
        <Legend>{body}</Legend>
      </Fieldset>
    );

    expect(rtlScreen.getByRole('group')).toHaveTextContent(body);
  });
});
