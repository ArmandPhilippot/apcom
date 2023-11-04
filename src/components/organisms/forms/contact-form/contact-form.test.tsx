import { describe, expect, it } from '@jest/globals';
import { userEvent } from '@testing-library/user-event';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { ContactForm, type ContactFormData } from './contact-form';

describe('ContactForm', () => {
  const user = userEvent.setup();

  it('renders the form fields with a submit button', () => {
    const label = 'Contact form';
    render(<ContactForm aria-label={label} />);

    expect(rtlScreen.getByRole('form')).toHaveAccessibleName(label);
    expect(
      rtlScreen.getByRole('textbox', { name: /^Name:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Email:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Object:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('textbox', { name: /^Message:/ })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('button', { name: /^Send/ })
    ).toBeInTheDocument();
  });

  /* eslint-disable max-statements */
  it('can submit the form', async () => {
    const onSubmit = jest.fn((_data: ContactFormData) => undefined);
    const values: ContactFormData = {
      email: 'Camryn.Hegmann23@gmail.com',
      message: 'Nulla eveniet tempora aliquid.',
      name: 'Erick82',
      object: 'sequi nobis unde',
    };

    render(<ContactForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.name
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Object:/ }),
      values.object
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Message:/ }),
      values.message
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Send/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
  });
  /* eslint-enable max-statements */

  /* eslint-disable max-statements */
  it('can submit the form and inform user on success', async () => {
    const successMsg = 'Mail has been sent.';
    const onSubmit = jest.fn((_data: ContactFormData) => {
      return {
        messages: { success: successMsg },
        validator: () => true,
      };
    });
    const values: ContactFormData = {
      email: 'Camryn.Hegmann23@gmail.com',
      message: 'Nulla eveniet tempora aliquid.',
      name: 'Erick82',
      object: 'sequi nobis unde',
    };

    render(<ContactForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.name
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Object:/ }),
      values.object
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Message:/ }),
      values.message
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Send/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
    expect(rtlScreen.getByText(successMsg)).toBeInTheDocument();
  });
  /* eslint-enable max-statements */

  /* eslint-disable max-statements */
  it('can abort submit and inform user on failure', async () => {
    const errorMsg = 'An error occurred.';
    const onSubmit = jest.fn((_data: ContactFormData) => {
      return {
        messages: { error: errorMsg },
        validator: () => false,
      };
    });
    const values: ContactFormData = {
      email: 'Camryn.Hegmann23@gmail.com',
      message: 'Nulla eveniet tempora aliquid.',
      name: 'Erick82',
      object: 'sequi nobis unde',
    };

    render(<ContactForm onSubmit={onSubmit} />);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(onSubmit).not.toHaveBeenCalled();

    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Name:/ }),
      values.name
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Email:/ }),
      values.email
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Object:/ }),
      values.object
    );
    await user.type(
      rtlScreen.getByRole('textbox', { name: /^Message:/ }),
      values.message
    );
    await user.click(rtlScreen.getByRole('button', { name: /^Send/ }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(values);
    expect(rtlScreen.getByText(errorMsg)).toBeInTheDocument();
  });
  /* eslint-enable max-statements */
});
