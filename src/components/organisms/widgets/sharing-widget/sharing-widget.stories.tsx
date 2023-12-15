import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../../atoms';
import { SharingWidget } from './sharing-widget';

const meta = {
  component: SharingWidget,
  title: 'Organisms/Widgets/Sharing',
} satisfies Meta<typeof SharingWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sharing: Story = {
  args: {
    data: {
      excerpt:
        'Alias similique eius ducimus laudantium aspernatur. Est rem ut eum temporibus sit reprehenderit aut non molestias. Vel dolorem expedita labore quo inventore aliquid nihil nam. Possimus nobis enim quas corporis eos.',
      title: 'Accusantium totam nostrum',
      url: 'https://www.example.test',
    },
    heading: <Heading level={3}>Share</Heading>,
    media: ['diaspora', 'facebook', 'linkedin', 'twitter', 'email'],
  },
};
