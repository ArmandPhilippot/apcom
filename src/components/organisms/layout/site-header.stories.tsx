import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Heading } from '../../atoms';
import { SiteHeader as SiteHeaderComponent } from './site-header';

/**
 * SiteHeader - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: SiteHeaderComponent,
  args: {
    ackeeStorageKey: 'ackee-tracking',
    isHome: false,
    motionStorageKey: 'reduced-motion',
    searchPage: '#',
    withLink: false,
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
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SiteHeaderComponent>;

const Template: ComponentStory<typeof SiteHeaderComponent> = (args) => (
  <SiteHeaderComponent {...args} />
);

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

/**
 * Layout Stories - SiteHeader
 */
export const SiteHeader = Template.bind({});
SiteHeader.args = {
  nav,
  logo: (
    <NextImage
      alt="A logo"
      height={100}
      src="https://picsum.photos/100"
      width={100}
    />
  ),
  name: <Heading level={1}>Website title</Heading>,
};
