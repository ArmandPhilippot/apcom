import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArrowIcon from './arrow';

export default {
  title: 'Atoms/Icons',
  component: ArrowIcon,
  argTypes: {
    direction: {
      control: {
        type: 'select',
      },
      description: 'An arrow icon.',
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: 'right' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ArrowIcon>;

const Template: ComponentStory<typeof ArrowIcon> = (args) => (
  <ArrowIcon {...args} />
);

export const Arrow = Template.bind({});
