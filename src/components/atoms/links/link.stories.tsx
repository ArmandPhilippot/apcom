import { ComponentMeta, ComponentStory } from '@storybook/react';
import Link from './link';

/**
 * Link - Storybook Meta
 */
export default {
  title: 'Atoms/Typography/Links',
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
    download: {
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
    external: {
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
  download: false,
  external: false,
};

/**
 * Links Stories - Download
 */
export const Download = Template.bind({});
Download.args = {
  children: 'A link to a file',
  href: '#',
  download: true,
  external: false,
};

/**
 * Links Stories - DownloadWithLang
 */
export const DownloadWithLang = Template.bind({});
DownloadWithLang.args = {
  children: 'A link to a file',
  href: '#',
  download: true,
  external: false,
  lang: 'en',
};

/**
 * Links Stories - External
 */
export const External = Template.bind({});
External.args = {
  children: 'A link',
  href: '#',
  download: false,
  external: true,
};

/**
 * Links Stories - External download
 */
export const ExternalDownload = Template.bind({});
ExternalDownload.args = {
  children: 'A link',
  href: '#',
  download: true,
  external: true,
};

/**
 * Links Stories - External With Lang
 */
export const ExternalWithLang = Template.bind({});
ExternalWithLang.args = {
  children: 'A link',
  href: '#',
  download: false,
  external: true,
  lang: 'en',
};

/**
 * Links Stories - External download with lang
 */
export const ExternalDownloadWithLang = Template.bind({});
ExternalDownloadWithLang.args = {
  children: 'A link',
  href: '#',
  download: true,
  external: true,
  lang: 'en',
};

/**
 * Links Stories - With Lang
 */
export const WithLang = Template.bind({});
WithLang.args = {
  children: 'A link',
  href: '#',
  download: false,
  external: false,
  lang: 'en',
};
