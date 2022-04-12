import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import FooterComponent from './footer';

export default {
  title: 'Organisms/Layout',
  component: FooterComponent,
  argTypes: {
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
  <IntlProvider locale="en">
    <FooterComponent {...args} />
  </IntlProvider>
);

const copyright = {
  dates: { start: '2017', end: '2022' },
  owner: 'Lorem ipsum',
  icon: 'CC',
};

const navItems = [{ id: 'legal-notice', href: '#', label: 'Legal notice' }];

export const Footer = Template.bind({});
Footer.args = {
  copyright,
  navItems,
  topId: 'top',
};
