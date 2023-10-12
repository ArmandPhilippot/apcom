import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Time } from './time';

/**
 * Time - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/Time',
  component: Time,
  argTypes: {
    date: {
      control: {
        type: 'text',
      },
      description: 'A valid date string.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Time>;

const Template: ComponentStory<typeof Time> = (args) => <Time {...args} />;

/**
 * Time Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  date: '2022-03-15 10:44:20',
};
