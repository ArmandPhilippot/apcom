import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NoResults as NoResultsComponent } from './no-results';

export default {
  title: 'Organisms/Layout',
  component: NoResultsComponent,
  argTypes: {},
} as ComponentMeta<typeof NoResultsComponent>;

const Template: ComponentStory<typeof NoResultsComponent> = (args) => (
  <NoResultsComponent {...args} />
);

export const NoResults = Template.bind({});
NoResults.args = {};
