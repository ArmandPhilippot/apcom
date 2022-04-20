import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
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
    value: {
      control: {
        type: null,
      },
      description: 'The prism theme value.',
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
} as ComponentMeta<typeof PrismThemeToggle>;

const Template: ComponentStory<typeof PrismThemeToggle> = (args) => (
  <PrismThemeToggle {...args} />
);

/**
 * Toggle Stories - Prism theme
 */
export const PrismTheme = Template.bind({});
PrismTheme.args = {
  value: false,
};
