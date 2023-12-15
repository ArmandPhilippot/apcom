import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../atoms';
import { MetaItem } from './meta-item';
import { MetaList } from './meta-list';

const meta = {
  component: MetaList,
  title: 'Molecules/MetaList',
} satisfies Meta<typeof MetaList>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { id: 'comments', label: 'Comments', value: 'No comments.' },
  {
    id: 'category',
    label: 'Category',
    value: <Link href="#cat1">Cat 1</Link>,
  },
  {
    id: 'tags',
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
    ],
  },
  {
    hasBorderedValues: true,
    hasInlinedValues: true,
    id: 'technologies',
    label: 'Technologies',
    value: [
      { id: 'techno1', value: 'HTML' },
      { id: 'techno2', value: 'CSS' },
      { id: 'techno3', value: 'Javascript' },
    ],
  },
];

export const Example: Story = {
  args: {
    children: items.map(({ id, ...item }) => <MetaItem key={id} {...item} />),
  },
};

export const Inlined: Story = {
  args: {
    children: items.map(({ id, ...item }) => <MetaItem key={id} {...item} />),
    isInline: true,
  },
};
