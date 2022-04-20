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
    external: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Options',
      },
      description: 'Determine if the link is external of the current website.',
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
  external: false,
};

/**
 * Links Stories - External
 */
export const External = Template.bind({});
External.args = {
  children: 'A link',
  href: '#',
  external: true,
};

/**
 * Links Stories - External With Lang
 */
export const ExternalWithLang = Template.bind({});
ExternalWithLang.args = {
  children: 'A link',
  href: '#',
  external: true,
  lang: 'en',
};
