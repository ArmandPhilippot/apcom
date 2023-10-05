import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { Form } from './form';

const doNothing = () => {
  // Do nothing
};

describe('Form', () => {
  it('renders a form', () => {
    render(
      <Form aria-label="A form name" onSubmit={doNothing}>
        Fields
      </Form>
    );
    expect(rtlScreen.getByRole('form')).toBeInTheDocument();
  });
});
