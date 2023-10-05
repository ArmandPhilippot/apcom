import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { ContactForm } from './contact-form';

const props = {
  sendMail: async () => {
    /** Do nothing. */
  },
};

describe('ContactForm', () => {
  it('renders a contact form', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('form', { name: 'Contact form' })
    ).toBeInTheDocument();
  });

  it('renders a name field', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Name:/ })
    ).toBeInTheDocument();
  });

  it('renders an email field', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Email:/ })
    ).toBeInTheDocument();
  });

  it('renders an object field', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Object:/ })
    ).toBeInTheDocument();
  });

  it('renders a message field', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Message:/ })
    ).toBeInTheDocument();
  });

  it('renders a submit button', () => {
    render(<ContactForm {...props} />);
    expect(
      rtlScreen.getByRole('button', { name: /^Send/ })
    ).toBeInTheDocument();
  });
});
