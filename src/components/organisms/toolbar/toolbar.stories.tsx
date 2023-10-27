import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Toolbar as ToolbarComponent } from './toolbar';

/**
 * Toolbar - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar',
  component: ToolbarComponent,
  args: {
    searchPage: '#',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the toolbar wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    nav: {
      description: 'The main nav items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    searchPage: {
      control: {
        type: 'text',
      },
      description: 'The search results page url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ToolbarComponent>;

const Template: ComponentStory<typeof ToolbarComponent> = (args) => (
  <ToolbarComponent {...args} />
);

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

/**
 * Toolbar Story
 */
export const Toolbar = Template.bind({});
Toolbar.args = {
  nav,
};
