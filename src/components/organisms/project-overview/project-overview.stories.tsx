import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { type OverviewMeta, ProjectOverview } from './project-overview';

/**
 * ProjectOverview - Storybook Meta
 */
export default {
  title: 'Organisms/ProjectOverview',
  component: ProjectOverview,
  argTypes: {
    cover: {
      description: 'The project cover',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    meta: {
      description: 'The overview meta.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'The project name.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ProjectOverview>;

const Template: ComponentStory<typeof ProjectOverview> = (args) => (
  <ProjectOverview {...args} />
);

const meta = {
  creationDate: '2015-09-02',
  lastUpdateDate: '2023-11-10',
  license: 'MIT',
} satisfies Partial<OverviewMeta>;

/**
 * ProjectOverview Stories - Meta
 */
export const Meta = Template.bind({});
Meta.args = {
  meta,
  name: 'Your project',
};

/**
 * ProjectOverview Stories - With cover
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
  meta,
  name: 'Your project',
};
