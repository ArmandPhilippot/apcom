import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Logo } from '../../atoms';
import { Branding } from './branding';

/**
 * Branding - Storybook Meta
 */
export default {
  title: 'Molecules/Layout/Branding',
  component: Branding,
  args: {
    isHome: false,
    withLink: false,
  },
  argTypes: {
    baseline: {
      control: {
        type: 'text',
      },
      description: 'The Branding baseline.',
      type: {
        name: 'string',
        required: false,
      },
    },
    isHome: {
      control: {
        type: 'boolean',
      },
      description: 'Use H1 if the current page is homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    photo: {
      control: {
        type: 'text',
      },
      description: 'The Branding photo.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The Branding title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    withLink: {
      control: {
        type: 'boolean',
      },
      description: 'Wraps the title with a link to homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Branding>;

const Template: ComponentStory<typeof Branding> = (args) => (
  <Branding {...args} />
);

/**
 * Branding Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  logo: <Logo heading="A logo example" />,
  photo: (
    <NextImage
      alt="A photo example"
      height={200}
      src="https://picsum.photos/200"
      width={200}
    />
  ),
  title: 'Website title',
};

/**
 * Branding Stories - With baseline
 */
export const WithBaseline = Template.bind({});
WithBaseline.args = {
  baseline: 'Maiores corporis qui',
  logo: <Logo heading="A logo example" />,
  photo: (
    <NextImage
      alt="A photo example"
      height={200}
      src="https://picsum.photos/200"
      width={200}
    />
  ),
  title: 'Website title',
};
