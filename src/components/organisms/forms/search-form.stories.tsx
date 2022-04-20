import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SearchForm from './search-form';

/**
 * SearchForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: SearchForm,
  args: {
    hideLabel: false,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the form wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    hideLabel: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the input label should be visually hidden.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
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
} as ComponentMeta<typeof SearchForm>;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

/**
 * Forms Stories - Search
 */
export const Search = Template.bind({});
Search.args = {
  hideLabel: true,
};
