import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../../../atoms';
import { LinksWidget, type LinksWidgetItemData } from './links-widget';

const meta = {
  component: LinksWidget,
  title: 'Organisms/Widgets/Links',
} satisfies Meta<typeof LinksWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { id: 'item11', label: 'Level 1: Item 1', url: '#' },
  {
    id: 'item12',
    label: 'Level 1: Item 2',
    url: '#',
    child: [
      { id: 'item21', label: 'Level 2: Item 1', url: '#' },
      { id: 'item22', label: 'Level 2: Item 2', url: '#' },
      {
        id: 'item23',
        label: 'Level 2: Item 3',
        url: '#',
        child: [
          { id: 'item31', label: 'Level 3: Item 1', url: '#' },
          { id: 'item32', label: 'Level 3: Item 2', url: '#' },
        ],
      },
      { id: 'item24', label: 'Level 2: Item 4', url: '#' },
    ],
  },
  { id: 'item13', label: 'Level 1: Item 3', url: '#' },
  { id: 'item14', label: 'Level 1: Item 4', url: '#' },
] satisfies LinksWidgetItemData[];

export const Unordered: Story = {
  args: {
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    items,
  },
};

export const Ordered: Story = {
  args: {
    heading: (
      <Heading isFake level={3}>
        Quo et totam
      </Heading>
    ),
    isOrdered: true,
    items,
  },
};
