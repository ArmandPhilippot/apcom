import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrismThemeToggle from './prism-theme-toggle';

/**
 * PrismThemeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: PrismThemeToggle,
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
} as ComponentMeta<typeof PrismThemeToggle>;

const Template: ComponentStory<typeof PrismThemeToggle> = (args) => (
  <PrismThemeToggle {...args} />
);

/**
 * Toggle Stories - Prism theme
 */
export const PrismTheme = Template.bind({});
