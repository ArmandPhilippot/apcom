import { ComponentMeta, ComponentStory } from '@storybook/react';
import Branding from './branding';

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
    unoptimized: { table: { disable: true } },
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
  title: 'Website title',
  photo: 'http://placeimg.com/640/480',
  // @ts-ignore - Needed because of the placeholder image.
  unoptimized: true,
};

/**
 * Branding Stories - With baseline
 */
export const WithBaseline = Template.bind({});
WithBaseline.args = {
  title: 'Website title',
  baseline: 'Maiores corporis qui',
  photo: 'http://placeimg.com/640/480',
  // @ts-ignore - Needed because of the placeholder image.
  unoptimized: true,
};
