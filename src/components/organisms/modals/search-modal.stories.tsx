import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SearchModal from './search-modal';

/**
 * SearchModal - Storybook Meta
 */
export default {
  title: 'Organisms/Modals',
  component: SearchModal,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the search modal wrapper.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
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
} as ComponentMeta<typeof SearchModal>;

const Template: ComponentStory<typeof SearchModal> = (args) => (
  <SearchModal {...args} />
);

/**
 * Modals Stories - Search
 */
export const Search = Template.bind({});
