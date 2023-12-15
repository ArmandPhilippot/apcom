import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { PostPreview } from './post-preview';

const meta = {
  component: PostPreview,
  title: 'Organisms/PostPreview',
} satisfies Meta<typeof PostPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    excerpt:
      'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
    heading: 'The post title',
    url: '#post',
  },
};

export const WithCover: Story = {
  args: {
    cover: (
      <NextImage
        alt=""
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    ),
    excerpt:
      'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
    heading: 'The post title',
    url: '#post',
  },
};

export const WithMeta: Story = {
  args: {
    excerpt:
      'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
    heading: 'The post title',
    meta: {
      publicationDate: '06/11/2023',
      thematics: [{ id: 1, name: 'Thematic 1', url: '#thematic' }],
      wordsCount: 300,
    },
    url: '#post',
  },
};

export const WithCoverAndMeta: Story = {
  args: {
    cover: (
      <NextImage
        alt=""
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    ),
    excerpt:
      'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
    heading: 'The post title',
    meta: {
      publicationDate: '06/11/2023',
      wordsCount: 300,
      thematics: [{ id: 1, name: 'Thematic 1', url: '#thematic' }],
      comments: {
        count: 3,
        postHeading: 'The post title',
        url: '#comments',
      },
    },
    url: '#post',
  },
};
