import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../../atoms';
import { MetaItem } from './meta-item';

const meta = {
  component: MetaItem,
  title: 'Molecules/MetaList/Item',
} satisfies Meta<typeof MetaItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleValue: Story = {
  args: {
    label: 'Comments',
    value: 'No comments',
  },
};

export const MultipleValues: Story = {
  args: {
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
    ],
  },
};

export const SingleValueBordered: Story = {
  args: {
    hasBorderedValues: true,
    label: 'Comments',
    value: 'No comments',
  },
};

export const MultipleValuesBordered: Story = {
  args: {
    hasBorderedValues: true,
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
    ],
  },
};

export const SingleValueInlined: Story = {
  args: {
    isInline: true,
    label: 'Comments',
    value: 'No comments',
  },
};

export const MultipleValuesInlined: Story = {
  args: {
    isInline: true,
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
    ],
  },
};

export const InlinedValues: Story = {
  args: {
    hasInlinedValues: true,
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">A long tag 2</Link> },
      { id: 'tag3', value: <Link href="#tag3">Tag 3</Link> },
    ],
  },
};
