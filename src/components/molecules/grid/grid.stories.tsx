import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Grid } from './grid';
import { GridItem } from './grid-item';

export default {
  title: 'Molecules/Grid',
  component: Grid,
  argTypes: {
    items: {
      description: 'The grid items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

export const Default = Template.bind({});
Default.args = {
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
};

export const OneColumn = Template.bind({});
OneColumn.args = {
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
    </>
  ),
  col: 1,
  gap: 'sm',
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
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
    </>
  ),
  col: 2,
  gap: 'sm',
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
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
    </>
  ),
  col: 3,
  gap: 'sm',
};

export const FixedSize = Template.bind({});
FixedSize.args = {
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
};

export const MaxSize = Template.bind({});
MaxSize.args = {
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
};

export const MinSize = Template.bind({});
MinSize.args = {
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
};

export const MinAndMaxSize = Template.bind({});
MinAndMaxSize.args = {
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
};

export const Fill = Template.bind({});
Fill.args = {
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
};
