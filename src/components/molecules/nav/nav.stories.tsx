import Envelop from '@components/atoms/icons/envelop';
import Home from '@components/atoms/icons/home';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import NavComponent, { type NavItem } from './nav';

/**
 * Nav - Storybook Meta
 */
export default {
  title: 'Molecules/Navigation/Nav',
  component: NavComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the navigation wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      control: {
        type: null,
      },
      description: 'The nav items.',
      type: {
        name: 'other',
        required: true,
        value: '',
      },
    },
    kind: {
      control: {
        type: 'select',
      },
      description: 'The navigation kind.',
      options: ['main', 'footer'],
      type: {
        name: 'string',
        required: true,
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
} as ComponentMeta<typeof NavComponent>;

const Template: ComponentStory<typeof NavComponent> = (args) => (
  <NavComponent {...args} />
);

const MainNavItems: NavItem[] = [
  { id: 'homeLink', href: '/', label: 'Home', logo: <Home /> },
  { id: 'contactLink', href: '/contact', label: 'Contact', logo: <Envelop /> },
];

const FooterNavItems: NavItem[] = [
  { id: 'contactLink', href: '/contact', label: 'Contact' },
  { id: 'legalLink', href: '/legal-notice', label: 'Legal notice' },
];

/**
 * Nav Stories - Main navigation
 */
export const MainNav = Template.bind({});
MainNav.args = {
  items: MainNavItems,
  kind: 'main',
};

/**
 * Nav Stories - Footer navigation
 */
export const FooterNav = Template.bind({});
FooterNav.args = {
  items: FooterNavItems,
  kind: 'footer',
};
