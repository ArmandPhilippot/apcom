import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ToolbarComponent from './toolbar';

/**
 * Toolbar - Storybook Meta
 */
export default {
  title: 'Organisms/Toolbar',
  component: ToolbarComponent,
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
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
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
