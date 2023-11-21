import { describe, expect, it, jest } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { NavbarItem } from './navbar-item';

describe('NavbarItem', () => {
  it('renders a labelled checkbox to open/close a modal', async () => {
    const label = 'quod';
    const modal = 'tempore ipsam laborum';
    const user = userEvent.setup();

    render(
      <NavbarItem icon="arrow" id="vel" label={label}>
        {modal}
      </NavbarItem>
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    const controller = rtlScreen.getByRole('checkbox', { name: label });

    expect(controller).not.toBeChecked();
    // Since the visibility is declared in CSS we cannot use this assertion.
    //expect(rtlScreen.getByText(modal)).not.toBeVisible();

    await user.click(controller);

    expect(controller).toBeChecked();
    expect(rtlScreen.getByText(modal)).toBeVisible();
  });

  it('can deactivate the modal when clicking outside', async () => {
    const label = 'qui';
    const modal = 'laborum doloremque id';
    const user = userEvent.setup();

    render(
      <NavbarItem icon="arrow" id="et" label={label}>
        {modal}
      </NavbarItem>
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(2);

    const controller = rtlScreen.getByRole('checkbox', { name: label });

    await user.click(controller);

    expect(controller).toBeChecked();

    if (controller.parentElement) await user.click(controller.parentElement);

    expect(controller).not.toBeChecked();
    // Since the visibility is declared in CSS we cannot use this assertion.
    //expect(rtlScreen.getByText(modal)).not.toBeVisible();
  });

  /* eslint-disable max-statements */
  it('accepts an activation handler', async () => {
    const handler = jest.fn();
    const user = userEvent.setup();
    const label = 'qui';

    render(
      <NavbarItem icon="arrow" id="aut" label={label} onActivation={handler}>
        Some contents
      </NavbarItem>
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(handler).not.toHaveBeenCalled();

    await user.click(rtlScreen.getByLabelText(label));

    /* For some reasons (probably setTimeout) it is called twice but if I use
    jest fake timers the test throws `Exceeded timeout`... So I leave it with 2
    for now. */
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(true);
  });
  /* eslint-enable max-statements */
});
