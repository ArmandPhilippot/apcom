import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SearchModalComponent from './search-modal';

export default {
  title: 'Organisms/Modals',
  component: SearchModalComponent,
} as ComponentMeta<typeof SearchModalComponent>;

const Template: ComponentStory<typeof SearchModalComponent> = (args) => (
  <IntlProvider locale="en">
    <SearchModalComponent {...args} />
  </IntlProvider>
);

export const SearchModal = Template.bind({});
