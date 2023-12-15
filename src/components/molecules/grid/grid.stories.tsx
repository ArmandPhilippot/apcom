import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './grid';
import { GridItem } from './grid-item';

const meta = {
  component: Grid,
  title: 'Molecules/Grid',
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
  },
};

export const OneColumn: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    col: 1,
    gap: 'sm',
  },
};

export const TwoColumns: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    col: 2,
    gap: 'sm',
  },
};

export const ThreeColumns: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    col: 3,
    gap: 'sm',
  },
};

export const FixedSize: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    size: '300px',
    gap: 'sm',
  },
};

export const MaxSize: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    sizeMax: '300px',
    gap: 'sm',
  },
};

export const MinSize: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    sizeMin: '100px',
    gap: 'sm',
  },
};

export const MinAndMaxSize: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    sizeMax: '300px',
    sizeMin: '100px',
    gap: 'sm',
  },
};

export const Fill: Story = {
  args: {
    children: (
      <>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 1
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 2
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 3
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 4
        </GridItem>
        <GridItem style={{ border: '1px solid #000', padding: '1rem' }}>
          Item 5
        </GridItem>
      </>
    ),
    col: 'auto-fill',
    sizeMin: '100px',
    gap: 'sm',
  },
};
