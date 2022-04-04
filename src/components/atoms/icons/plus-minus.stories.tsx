import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlusMinusIcon from './plus-minus';

export default {
  title: 'Atoms/Icons',
  component: PlusMinusIcon,
  args: {
    ariaHidden: true,
  },
  argTypes: {
    additionalClasses: {
      control: {
        type: 'text',
      },
      description: 'Set additional classes.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    ariaHidden: {
      control: {
        type: 'boolean',
      },
      description: 'Should be hidden for accessibility.',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    ariaLabel: {
      control: {
        type: 'text',
      },
      description: 'An accessible name.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    state: {
      control: {
        type: 'radio',
        options: ['plus', 'minus'],
      },
      description: 'Which state should be displayed.',
      type: {
        name: 'enum',
        required: true,
        value: ['plus', 'minus'],
      },
    },
  },
} as ComponentMeta<typeof PlusMinusIcon>;

const Template: ComponentStory<typeof PlusMinusIcon> = (args) => (
  <PlusMinusIcon {...args} />
);

export const PlusMinus = Template.bind({});
PlusMinus.args = {
  state: 'plus',
};
