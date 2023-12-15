import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm, type SearchFormSubmit } from './search-form';

const meta = {
  component: SearchForm,
  title: 'Organisms/Forms/Search',
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const search: SearchFormSubmit = () => {
  console.log('Searching!');

  return undefined;
};

export const Example: Story = {
  args: {
    onSubmit: search,
  },
};

export const WithLabelHidden: Story = {
  args: {
    isLabelHidden: true,
    onSubmit: search,
  },
};
