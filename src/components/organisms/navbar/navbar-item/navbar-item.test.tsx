import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useBoolean } from '../../../../utils/hooks';
import { NavbarItem, type NavbarItemProps } from './navbar-item';

const ControlledNavbarItem = ({
  isActive,
  ...props
}: Omit<NavbarItemProps, 'onDeactivate' | 'onToggle'>) => {
  const { deactivate, state, toggle } = useBoolean(isActive);

  return (
    <NavbarItem
      {...props}
      isActive={state}
      onDeactivate={deactivate}
      onToggle={toggle}
    />
  );
};

describe('NavbarItem', () => {
  it('renders a labelled checkbox to open/close a modal', async () => {
    const label = 'quod';
    const modal = 'tempore ipsam laborum';
    const user = userEvent.setup();

    render(
      <ControlledNavbarItem
        icon="arrow"
        id="vel"
        isActive={false}
        label={label}
      >
        {modal}
      </ControlledNavbarItem>
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
      <ControlledNavbarItem icon="arrow" id="et" isActive label={label}>
        {modal}
      </ControlledNavbarItem>
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(2);

    const controller = rtlScreen.getByRole('checkbox', { name: label });

    expect(controller).toBeChecked();

    if (controller.parentElement) await user.click(controller.parentElement);

    expect(controller).not.toBeChecked();
    // Since the visibility is declared in CSS we cannot use this assertion.
    //expect(rtlScreen.getByText(modal)).not.toBeVisible();
  });
});
