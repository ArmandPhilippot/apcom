import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { PostPreview } from './post-preview';

/**
 * PostPreview - Storybook Meta
 */
export default {
  title: 'Organisms/PostPreview',
  component: PostPreview,
  argTypes: {
    cover: {
      description: 'The cover data.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    excerpt: {
      control: {
        type: 'text',
      },
      description: 'The page excerpt.',
      type: {
        name: 'string',
        required: true,
      },
    },
    meta: {
      description: 'The page metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    heading: {
      control: {
        type: 'text',
      },
      description: 'The page title',
      type: {
        name: 'string',
        required: true,
      },
    },
    headingLvl: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The page title level (hn)',
      table: {
        category: 'Options',
        defaultValue: { summary: 2 },
      },
      type: {
        name: 'number',
        required: false,
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'The page url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof PostPreview>;

const Template: ComponentStory<typeof PostPreview> = (args) => (
  <PostPreview {...args} />
);

/**
 * PostPreview Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  excerpt:
    'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
  heading: 'The post title',
  url: '#post',
};

/**
 * PostPreview Stories - WithCover
 */
export const WithCover = Template.bind({});
WithCover.args = {
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
};

/**
 * PostPreview Stories - WithMeta
 */
export const WithMeta = Template.bind({});
WithMeta.args = {
  excerpt:
    'Et vel amet minus. Inventore magnam et vel ea animi omnis qui. Dicta quos qui consequuntur aspernatur ullam non nam odio et. Incidunt fugit sequi. Neque sit vel tenetur libero sit aut quisquam est et. Nostrum autem et.',
  heading: 'The post title',
  meta: {
    publicationDate: '06/11/2023',
    thematics: [{ id: 1, name: 'Thematic 1', url: '#thematic' }],
    wordsCount: 300,
  },
  url: '#post',
};

/**
 * PostPreview Stories - WithCoverAndMeta
 */
export const WithCoverAndMeta = Template.bind({});
WithCoverAndMeta.args = {
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
};
