import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SocialMedia as SocialMediaWidget, type Media } from './social-media';

/**
 * SocialMedia - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets',
  component: SocialMediaWidget,
  argTypes: {
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The heading level.',
      type: {
        name: 'number',
        required: true,
      },
    },
    media: {
      description: 'The links data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The widget title.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SocialMediaWidget>;

const Template: ComponentStory<typeof SocialMediaWidget> = (args) => (
  <SocialMediaWidget {...args} />
);

const media: Media[] = [
  { icon: 'Github', id: 'github', label: 'Github', url: '#' },
  { icon: 'LinkedIn', id: 'gitlab', label: 'Gitlab', url: '#' },
];

/**
 * Widgets Stories - Social media
 */
export const SocialMedia = Template.bind({});
SocialMedia.args = {
  media,
  title: 'Follow me',
  level: 2,
};
