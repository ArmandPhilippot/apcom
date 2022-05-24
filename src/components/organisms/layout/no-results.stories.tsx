import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoResultsComponent from './no-results';

export default {
  title: 'Organisms/Layout',
  component: NoResultsComponent,
  argTypes: {
    searchPage: {
      control: {
        type: 'text',
      },
      description: 'The search results page.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof NoResultsComponent>;

const Template: ComponentStory<typeof NoResultsComponent> = (args) => (
  <NoResultsComponent {...args} />
);

export const NoResults = Template.bind({});
NoResults.args = {
  searchPage: '#',
};
