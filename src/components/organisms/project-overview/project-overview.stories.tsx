import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { type OverviewMeta, ProjectOverview } from './project-overview';

const meta = {
  component: ProjectOverview,
  title: 'Organisms/ProjectOverview',
} satisfies Meta<typeof ProjectOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

const projectMeta = {
  creationDate: '2015-09-02',
  lastUpdateDate: '2023-11-10',
  license: 'MIT',
} satisfies Partial<OverviewMeta>;

export const Example: Story = {
  args: {
    meta: projectMeta,
    name: 'Your project',
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
    meta: projectMeta,
    name: 'Your project',
  },
};
