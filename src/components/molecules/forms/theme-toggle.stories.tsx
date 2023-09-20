import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeToggle } from './theme-toggle';

/**
 * ThemeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: ThemeToggle,
  argTypes: {
    bodyClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the fieldset body wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    groupClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the radio group wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legendClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the legend.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ThemeToggle>;

const Template: ComponentStory<typeof ThemeToggle> = (args) => (
  <ThemeToggle {...args} />
);

/**
 * Toggle Stories - Theme
 */
export const Theme = Template.bind({});
