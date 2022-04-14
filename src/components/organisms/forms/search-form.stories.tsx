import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SearchFormComponent from './search-form';

export default {
  title: 'Organisms/Forms',
  component: SearchFormComponent,
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
  },
} as ComponentMeta<typeof SearchFormComponent>;

const Template: ComponentStory<typeof SearchFormComponent> = (args) => (
  <IntlProvider locale="en">
    <SearchFormComponent {...args} />
  </IntlProvider>
);

export const SearchForm = Template.bind({});
SearchForm.args = {
  hideLabel: true,
};
