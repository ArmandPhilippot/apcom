import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './link';

const meta = {
  component: Link,
  title: 'Atoms/Links',
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A link',
    href: '#link',
  },
};

export const WithLang: Story = {
  args: {
    children: 'Github repository',
    href: 'https://github.com/ArmandPhilippot/apcom',
    lang: 'en',
  },
  render: (args) => (
    <>
      Go to the <Link {...args} />.
    </>
  ),
};

export const DownloadLink: Story = {
  args: {
    children: 'Download the file',
    href: '#file',
    isDownload: true,
  },
};

export const DownloadLinkWithLang: Story = {
  args: {
    children: 'Download the file',
    href: '#file',
    isDownload: true,
    lang: 'en',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Go to the Github repository',
    href: 'https://github.com/ArmandPhilippot/apcom',
    isExternal: true,
  },
};

export const ExternalLinkWithLang: Story = {
  args: {
    children: 'Go to the Github repository',
    href: 'https://github.com/ArmandPhilippot/apcom',
    isExternal: true,
    lang: 'en',
  },
};

export const ExternalDownloadLink: Story = {
  args: {
    children: 'Download the file',
    href: '#file',
    isDownload: true,
    isExternal: true,
  },
};

export const ExternalDownloadLinkWithLang: Story = {
  args: {
    children: 'Download the file',
    href: '#file',
    isDownload: true,
    isExternal: true,
    lang: 'en',
  },
};
