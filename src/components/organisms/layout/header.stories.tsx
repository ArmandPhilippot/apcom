import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import HeaderComponent from './header';

/**
 * Header - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: HeaderComponent,
  args: {
    isHome: false,
    withLink: false,
  },
  argTypes: {
    baseline: {
      control: {
        type: 'text',
      },
      description: 'The branding baseline.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the header wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isHome: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the current page is homepage or not.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    nav: {
      description: 'The main navigation items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    photo: {
      control: {
        type: 'text',
      },
      description: 'The branding photo.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The website title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    unoptimized: { table: { disable: true } },
    withLink: {
      control: {
        type: 'boolean',
      },
      description: 'Wrap the website title with a link to homepage.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'boolean',
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
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <HeaderComponent {...args} />
);

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

/**
 * Layout Stories - Header
 */
export const Header = Template.bind({});
Header.args = {
  nav,
  photo: 'http://placeimg.com/640/480/people',
  title: 'Website title',
  // @ts-ignore - Needed because of the placeholder image.
  unoptimized: true,
};
