import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Copyright } from './copyright';

/**
 * Copyright - Storybook Meta
 */
export default {
  title: 'Molecules/Copyright',
  component: Copyright,
  argTypes: {
    from: {
      control: {
        type: 'text',
      },
      description: 'The copyright start date.',
      type: {
        name: 'string',
        required: true,
      },
    },
    owner: {
      control: {
        type: 'text',
      },
      description: 'The copyright owner.',
      type: {
        name: 'string',
        required: true,
      },
    },
    to: {
      control: {
        type: 'text',
      },
      description: 'The copyright end date.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Copyright>;

const Template: ComponentStory<typeof Copyright> = (args) => (
  <Copyright {...args} />
);

/**
 * Copyright Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  from: '2012',
  owner: 'Your brand',
};

/**
 * Copyright Stories - WithEndYear
 */
export const WithEndYear = Template.bind({});
WithEndYear.args = {
  from: '2012',
  owner: 'Your brand',
  to: '2023',
};
