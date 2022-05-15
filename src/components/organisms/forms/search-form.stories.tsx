import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchForm from './search-form';

/**
 * SearchForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: SearchForm,
  args: {
    hideLabel: false,
    searchPage: '#',
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
