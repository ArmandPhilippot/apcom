import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../../atoms';
import { SocialMediaWidget, type SocialMediaData } from './social-media-widget';

/**
 * SocialMedia - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/SocialMedia',
  component: SocialMediaWidget,
  argTypes: {
    media: {
      description: 'The social media data.',
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

const media: SocialMediaData[] = [
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
