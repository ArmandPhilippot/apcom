import { ComponentMeta, ComponentStory } from '@storybook/react';
import ThemeToggle from './theme-toggle';

/**
 * ThemeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: ThemeToggle,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the toggle wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label wrapper.',
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
