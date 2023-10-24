import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';

/**
 * Breadcrumbs - Storybook Meta
 */
export default {
  title: 'Organisms/Nav/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    items: {
      description: 'The breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

/**
 * Breadcrumbs Stories - One item
 */
export const OneItem = Template.bind({});
OneItem.args = {
  items: [{ id: 'home', url: '#', name: 'Home' }],
};

/**
 * Breadcrumbs Stories - Two items
 */
export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    { id: 'home', url: '#', name: 'Home' },
    { id: 'blog', url: '#', name: 'Blog' },
  ],
};

/**
 * Breadcrumbs Stories - Three items
 */
export const ThreeItems = Template.bind({});
ThreeItems.args = {
  items: [
    { id: 'home', url: '#', name: 'Home' },
    { id: 'blog', url: '#', name: 'Blog' },
    { id: 'post1', url: '#', name: 'A Post' },
  ],
};
