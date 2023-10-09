import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Heading } from '../../atoms';
import { Branding } from './branding';

/**
 * Branding - Storybook Meta
 */
export default {
  title: 'Molecules/Branding',
  component: Branding,
  args: {},
  argTypes: {
    baseline: {
      control: {
        type: 'object',
      },
      description: 'The brand baseline.',
      type: {
        name: 'function',
        required: false,
      },
    },
    logo: {
      control: {
        type: 'object',
      },
      description: 'The brand logo.',
      type: {
        name: 'function',
        required: true,
      },
    },
    name: {
      control: {
        type: 'object',
      },
      description: 'The brand name.',
      type: {
        name: 'function',
        required: true,
      },
    },
    url: {
      control: {
        type: 'string',
      },
      description: 'The homepage url.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Branding>;

const Template: ComponentStory<typeof Branding> = (args) => (
  <Branding {...args} />
);

/**
 * Branding Stories - Logo and title
 */
export const LogoAndTitle = Template.bind({});
LogoAndTitle.args = {
  logo: (
    <NextImage
      alt="Your brand logo"
      height={150}
      src="https://picsum.photos/150"
      width={150}
    />
  ),
  name: <Heading level={1}>Your brand name</Heading>,
};

/**
 * Branding Stories - Logo, title and baseline
 */
export const LogoTitleAndBaseline = Template.bind({});
LogoTitleAndBaseline.args = {
  baseline: <div>Your brand baseline if any</div>,
  logo: (
    <NextImage
      alt="Your brand logo"
      height={150}
      src="https://picsum.photos/150"
      width={150}
    />
  ),
  name: <Heading level={1}>Your brand name</Heading>,
};
