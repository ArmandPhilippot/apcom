import { ComponentMeta, ComponentStory } from '@storybook/react';
import FooterComponent from './footer';

/**
 * Footer - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: FooterComponent,
  argTypes: {
    backToTopClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the back to top button.',
      table: {
        category: 'Styles',
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
      description: 'Set additional classnames to the footer element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    copyright: {
      description: 'The copyright information.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    navItems: {
      description: 'The footer nav items.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    topId: {
      control: {
        type: 'text',
      },
      description:
        'An element id (without hashtag) used as target by back to top button.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof FooterComponent>;

const Template: ComponentStory<typeof FooterComponent> = (args) => (
  <FooterComponent {...args} />
);

const copyright = {
  dates: { start: '2017', end: '2022' },
  owner: 'Lorem ipsum',
  icon: 'CC',
};

const navItems = [{ id: 'legal-notice', href: '#', label: 'Legal notice' }];

/**
 * Layout Stories - Footer
 */
export const Footer = Template.bind({});
Footer.args = {
  copyright,
  navItems,
  topId: 'top',
};
