import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../../atoms';
import { Copyright } from '../copyright';
import { Colophon } from './colophon';

/**
 * Colophon - Storybook Meta
 */
export default {
  title: 'Molecules/Colophon',
  component: Colophon,
  argTypes: {
    copyright: {
      description: 'The website copyright.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    links: {
      control: {
        type: 'object',
      },
      description:
        'Adds links to the colophon (a Legal Notice link for example).',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Colophon>;

const Template: ComponentStory<typeof Colophon> = (args) => (
  <Colophon {...args} />
);

/**
 * Colophon Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  copyright: <Copyright from="2021" owner="Brand" to="2023" />,
};

/**
 * Colophon Stories - WithLicense
 */
export const WithLicense = Template.bind({});
WithLicense.args = {
  copyright: <Copyright from="2021" owner="Brand" to="2023" />,
  license: <Icon heading="CC BY SA" shape="cc-by-sa" />,
};

/**
 * Colophon Stories - WithLinks
 */
export const WithLinks = Template.bind({});
WithLinks.args = {
  copyright: <Copyright from="2021" owner="Brand" to="2023" />,
  links: [
    { href: '#legal', id: 'item-1', label: 'Legal notice' },
    { href: '#credits', id: 'item-2', label: 'Credits' },
  ],
};

/**
 * Colophon Stories - WithLicenseAndLinks
 */
export const WithLicenseAndLinks = Template.bind({});
WithLicenseAndLinks.args = {
  copyright: <Copyright from="2021" owner="Brand" to="2023" />,
  license: <Icon heading="CC BY SA" shape="cc-by-sa" />,
  links: [
    { href: '#legal', id: 'item-1', label: 'Legal notice' },
    { href: '#credits', id: 'item-2', label: 'Credits' },
  ],
};
