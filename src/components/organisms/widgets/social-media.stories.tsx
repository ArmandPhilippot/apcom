import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../atoms';
import { SocialMedia as SocialMediaWidget, type Media } from './social-media';

/**
 * SocialMedia - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets',
  component: SocialMediaWidget,
  argTypes: {
    media: {
      description: 'The links data.',
      type: {
        name: 'object',
        required: true,
        value: {},
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
  heading: (
    <Heading isFake level={3}>
      Follow me
    </Heading>
  ),
  media,
};
