import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEventHandler, useCallback, useState } from 'react';
import { Icon } from '../../../atoms';
import { Switch, type SwitchProps } from './switch';

type ControlledSwitchProps = Omit<SwitchProps, 'onSwitch' | 'selectedItem'>;

const ControlledSwitch = ({ items, ...props }: ControlledSwitchProps) => {
  const [selection, setSelection] = useState(items[0].value);

  const handleSwitch: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSelection(e.target.value);
    },
    []
  );

  return (
    <Switch
      {...props}
      items={items}
      onSwitch={handleSwitch}
      value={selection}
    />
  );
};

const meta = {
  title: 'Molecules/Forms/Switch',
  component: Switch,
  render: ControlledSwitch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof ControlledSwitch>;

export const Example: Story = {
  args: {
    items: [
      { id: 'item-1', label: 'Item 1', value: 'item-1' },
      { id: 'item-2', label: 'Item 2', value: 'item-2' },
    ],
    name: 'example',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    items: [
      { id: 'disabled-item-1', label: 'Item 1', value: 'item-1' },
      { id: 'disabled-item-2', label: 'Item 2', value: 'item-2' },
    ],
    name: 'disabled',
  },
};

export const Icons: Story = {
  args: {
    items: [
      {
        id: 'light-theme',
        label: <Icon aria-label="Light theme" shape="sun" size="xs" />,
        value: 'light-theme',
      },
      {
        id: 'dark-theme',
        label: <Icon aria-label="Dark theme" shape="moon" size="xs" />,
        value: 'dark-theme',
      },
    ],
    name: 'theme',
  },
};
