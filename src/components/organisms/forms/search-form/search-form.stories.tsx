import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SearchForm } from './search-form';

/**
 * SearchForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Search',
  component: SearchForm,
  argTypes: {
    isLabelHidden: {
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
 * SearchForm Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  isLabelHidden: false,
};

/**
 * SearchForm Stories - With hidden label
 */
export const WithHiddenLabel = Template.bind({});
WithHiddenLabel.args = {
  isLabelHidden: true,
};
