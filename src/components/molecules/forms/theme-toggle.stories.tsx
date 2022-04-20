import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ThemeToggle from './theme-toggle';

/**
 * ThemeToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: ThemeToggle,
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
    value: {
      control: {
        type: null,
      },
      description: 'The theme value.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof ThemeToggle>;

const Template: ComponentStory<typeof ThemeToggle> = (args) => (
  <ThemeToggle {...args} />
);

/**
 * Toggle Stories - Theme
 */
export const Theme = Template.bind({});
Theme.args = {
  value: false,
};
