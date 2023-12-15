import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../../atoms';
import { type SocialMediaData, SocialMediaWidget } from './social-media-widget';

const meta = {
  component: SocialMediaWidget,
  title: 'Organisms/Widgets/Social Media',
} satisfies Meta<typeof SocialMediaWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

const media: SocialMediaData[] = [
  { icon: 'Github', id: 'github', label: 'Github', url: '#' },
  { icon: 'LinkedIn', id: 'gitlab', label: 'Gitlab', url: '#' },
];

export const SocialMedia: Story = {
  args: {
    heading: (
      <Heading isFake level={3}>
        Follow me
      </Heading>
    ),
    media,
  },
};
