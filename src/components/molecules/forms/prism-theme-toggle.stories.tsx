import { ComponentMeta, ComponentStory } from '@storybook/react';
import PrismThemeToggle from './prism-theme-toggle';

/**
 * PrismThemeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: PrismThemeToggle,
  argTypes: {
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
} as ComponentMeta<typeof PrismThemeToggle>;

const Template: ComponentStory<typeof PrismThemeToggle> = (args) => (
  <PrismThemeToggle {...args} />
);

/**
 * Toggle Stories - Prism theme
 */
export const PrismTheme = Template.bind({});
