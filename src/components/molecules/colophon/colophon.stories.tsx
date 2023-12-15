import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../../atoms';
import { Copyright } from '../copyright';
import { Colophon } from './colophon';

const meta = {
  component: Colophon,
  title: 'Molecules/Colophon',
} satisfies Meta<typeof Colophon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    copyright: <Copyright from="2021" owner="Brand" to="2023" />,
  },
};

export const WithLicense: Story = {
  args: {
    copyright: <Copyright from="2021" owner="Brand" to="2023" />,
    license: <Icon heading="CC BY SA" shape="cc-by-sa" />,
  },
};

export const WithLinks: Story = {
  args: {
    copyright: <Copyright from="2021" owner="Brand" to="2023" />,
    links: [
      { href: '#legal', id: 'item-1', label: 'Legal notice' },
      { href: '#credits', id: 'item-2', label: 'Credits' },
    ],
  },
};

export const WithLicenseAndLinks: Story = {
  args: {
    copyright: <Copyright from="2021" owner="Brand" to="2023" />,
    license: <Icon heading="CC BY SA" shape="cc-by-sa" />,
    links: [
      { href: '#legal', id: 'item-1', label: 'Legal notice' },
      { href: '#credits', id: 'item-2', label: 'Credits' },
    ],
  },
};
