import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AckeeToggle } from './ackee-toggle';
import { storageKey } from './ackee-toggle.fixture';

/**
 * AckeeToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Toggle',
  component: AckeeToggle,
  argTypes: {
    defaultValue: {
      control: {
        type: 'select',
      },
      description: 'Set the default value.',
      options: ['full', 'partial'],
      type: {
        name: 'string',
        required: true,
      },
    },
    storageKey: {
      control: {
        type: 'text',
      },
      description: 'Set local storage key.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof AckeeToggle>;

const Template: ComponentStory<typeof AckeeToggle> = (args) => (
  <AckeeToggle {...args} />
);

/**
 * Toggle Stories - Ackee
 */
export const Ackee = Template.bind({});
Ackee.args = {
  defaultValue: 'full',
  storageKey,
};
