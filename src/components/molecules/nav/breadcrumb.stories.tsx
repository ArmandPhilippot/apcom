import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Breadcrumb } from './breadcrumb';

/**
 * Breadcrumb - Storybook Meta
 */
export default {
  title: 'Molecules/Navigation/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Styles',
      },
      description: 'Set additional classnames to the nav element.',
      type: {
        name: 'string',
        required: false,
      },
    },
    itemClassName: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Styles',
      },
      description: 'Set additional classnames to the breadcrumb items.',
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      description: 'The breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args} />
);

/**
 * Breadcrumb Stories - One item
 */
export const OneItem = Template.bind({});
OneItem.args = {
  items: [{ id: 'home', url: '#', name: 'Home' }],
};

/**
 * Breadcrumb Stories - Two items
 */
export const TwoItems = Template.bind({});
TwoItems.args = {
  items: [
    { id: 'home', url: '#', name: 'Home' },
    { id: 'blog', url: '#', name: 'Blog' },
  ],
};

/**
 * Breadcrumb Stories - Three items
 */
export const ThreeItems = Template.bind({});
ThreeItems.args = {
  items: [
    { id: 'home', url: '#', name: 'Home' },
    { id: 'blog', url: '#', name: 'Blog' },
    { id: 'post1', url: '#', name: 'A Post' },
  ],
};
