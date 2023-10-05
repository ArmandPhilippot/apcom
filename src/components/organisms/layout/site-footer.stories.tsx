import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../../atoms';
import { SiteFooter as SiteFooterComponent } from './site-footer';

/**
 * SiteFooter - Storybook Meta
 */
export default {
  title: 'Organisms/Layout',
  component: SiteFooterComponent,
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
} as ComponentMeta<typeof SiteFooterComponent>;

const Template: ComponentStory<typeof SiteFooterComponent> = (args) => (
  <SiteFooterComponent {...args} />
);

const copyright = {
  dates: { start: '2017', end: '2022' },
  owner: 'Lorem ipsum',
  icon: <Icon shape="cc-by-sa" />,
};

const navItems = [{ id: 'legal-notice', href: '#', label: 'Legal notice' }];

/**
 * Layout Stories - SiteFooter
 */
export const SiteFooter = Template.bind({});
SiteFooter.args = {
  copyright,
  navItems,
  topId: 'top',
};