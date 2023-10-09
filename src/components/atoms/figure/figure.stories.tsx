import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Figure } from './figure';

/**
 * Figure - Storybook Meta
 */
export default {
  title: 'Atoms/Figure',
  component: Figure,
  args: {},
  argTypes: {
    caption: {
      control: {
        type: 'text',
      },
      description: 'A figure caption.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    hasBorders: {
      control: {
        type: 'boolean',
      },
      description: 'Add borders around the figure.',
      table: {
        category: 'Styles',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Figure>;

const Template: ComponentStory<typeof Figure> = (args) => <Figure {...args} />;

/**
 * Figure Stories - Illustration
 */
export const Illustration = Template.bind({});
Illustration.args = {
  children: (
    <NextImage
      alt="An example"
      height={480}
      src="https://picsum.photos/640/480"
      width={640}
    />
  ),
};

/**
 * Figure Stories - BorderedIllustration
 */
export const BorderedIllustration = Template.bind({});
BorderedIllustration.args = {
  children: (
    <NextImage
      alt="An example"
      height={480}
      src="https://picsum.photos/640/480"
      width={640}
    />
  ),
  hasBorders: true,
};
