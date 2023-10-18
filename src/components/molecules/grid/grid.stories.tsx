import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { FC, ReactNode } from 'react';
import { Grid } from './grid';

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

type ItemProps = {
  children: ReactNode;
};

const Item: FC<ItemProps> = ({ children }) => (
  <div style={{ border: '1px solid #000', padding: '1rem' }}>{children}</div>
);

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
};

export const OneColumn = Template.bind({});
OneColumn.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
  ],
  col: 1,
  gap: 'sm',
};

export const TwoColumns = Template.bind({});
TwoColumns.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
  ],
  col: 2,
  gap: 'sm',
};

export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
  ],
  col: 3,
  gap: 'sm',
};

export const FixedSize = Template.bind({});
FixedSize.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
  size: '300px',
  gap: 'sm',
};

export const MaxSize = Template.bind({});
MaxSize.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
  sizeMax: '300px',
  gap: 'sm',
};

export const MinSize = Template.bind({});
MinSize.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
  sizeMin: '100px',
  gap: 'sm',
};

export const MinAndMaxSize = Template.bind({});
MinAndMaxSize.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
  sizeMax: '300px',
  sizeMin: '100px',
  gap: 'sm',
};

export const Fill = Template.bind({});
Fill.args = {
  items: [
    { id: 'item-1', item: <Item>Item 1</Item> },
    { id: 'item-2', item: <Item>Item 2</Item> },
    { id: 'item-3', item: <Item>Item 3</Item> },
    { id: 'item-4', item: <Item>Item 4</Item> },
    { id: 'item-5', item: <Item>Item 5</Item> },
  ],
  col: 'auto-fill',
  sizeMin: '100px',
  gap: 'sm',
};
