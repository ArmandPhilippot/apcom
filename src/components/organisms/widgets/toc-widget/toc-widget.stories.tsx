import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../../atoms';
import { TocWidget } from './toc-widget';

const meta = {
  component: TocWidget,
  title: 'Organisms/Widgets/Table of Contents',
} satisfies Meta<typeof TocWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TableOfContents: Story = {
  args: {
    heading: <Heading level={3}>Table of contents</Heading>,
    tree: [
      { children: [], depth: 2, id: 'title1', label: 'Title 1' },
      {
        children: [
          { children: [], depth: 3, id: 'subtitle1', label: 'Subtitle 1' },
          { children: [], depth: 3, id: 'subtitle2', label: 'Subtitle 2' },
        ],
        depth: 2,
        id: 'title2',
        label: 'Title 2',
      },
      { children: [], depth: 2, id: 'title3', label: 'Title 3' },
    ],
  },
};
