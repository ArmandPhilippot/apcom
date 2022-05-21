import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToolbarComponent from './toolbar';

/**
 * Toolbar - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar',
  component: ToolbarComponent,
  args: {
    ackeeStorageKey: 'ackee-tracking',
    motionStorageKey: 'reduced-motion',
    searchPage: '#',
  },
  argTypes: {
    ackeeStorageKey: {
      control: {
        type: 'text',
      },
      description: 'Set Ackee settings local storage key.',
      type: {
        name: 'string',
        required: true,
      },
    },
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
    motionStorageKey: {
      control: {
        type: 'text',
      },
      description: 'Set Reduced motion settings local storage key.',
      type: {
        name: 'string',
        required: true,
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
