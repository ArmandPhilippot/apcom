import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from './link';

/**
 * Link - Storybook Meta
 */
export default {
  title: 'Atoms/Links/Link',
  component: Link,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The link body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    href: {
      control: {
        type: 'text',
      },
      description: 'The link target.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isDownload: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the link purpose is to download a file.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isExternal: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the link is external of the current website.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    lang: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Options',
      },
      description: 'The target language as code language.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

/**
 * Links Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: 'A link',
  href: '#',
};

/**
 * Links Stories - Download
 */
export const DownloadLink = Template.bind({});
DownloadLink.args = {
  children: 'A link to a file',
  href: '#',
  isDownload: true,
  isExternal: false,
};

/**
 * Links Stories - Download link with lang
 */
export const DownloadLinkWithLang = Template.bind({});
DownloadLinkWithLang.args = {
  children: 'A link to a file',
  href: '#',
  isDownload: true,
  isExternal: false,
  lang: 'en',
};

/**
 * Links Stories - External
 */
export const ExternalLink = Template.bind({});
ExternalLink.args = {
  children: 'A link',
  href: '#',
  isDownload: false,
  isExternal: true,
};

/**
 * Links Stories - External download link
 */
export const ExternalDownload = Template.bind({});
ExternalDownload.args = {
  children: 'A link',
  href: '#',
  isDownload: true,
  isExternal: true,
};

/**
 * Links Stories - External link with Lang
 */
export const ExternalLinkWithLang = Template.bind({});
ExternalLinkWithLang.args = {
  children: 'A link',
  href: '#',
  isDownload: false,
  isExternal: true,
  lang: 'en',
};

/**
 * Links Stories - External download with lang
 */
export const ExternalDownloadWithLang = Template.bind({});
ExternalDownloadWithLang.args = {
  children: 'A link',
  href: '#',
  isDownload: true,
  isExternal: true,
  lang: 'en',
};

/**
 * Links Stories - With Lang
 */
export const LinkLang = Template.bind({});
LinkLang.args = {
  children: 'A link',
  href: '#',
  isDownload: false,
  isExternal: false,
  lang: 'en',
};
