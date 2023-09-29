import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { List, type ListProps } from './list';
import { ListItem } from './list-item';

/**
 * List - Storybook Meta
 */
export default {
  title: 'Atoms/Lists',
  component: List,
  args: {},
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list wrapper',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = <
  O extends boolean,
  H extends boolean,
>(
  args: ListProps<O, H>
) => <List {...args} />;

/**
 * List Stories - Hierarchical list
 */
export const Hierarchical = Template.bind({});
Hierarchical.args = {
  children: [
    <ListItem key="item-1">
      Item 1
      <List isHierarchical isOrdered>
        <ListItem>Subitem 1</ListItem>
        <ListItem>Subitem 2</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-2">
      Item 2
      <List isHierarchical isOrdered>
        <ListItem>Subitem 1</ListItem>
        <ListItem>
          Subitem 2
          <List isHierarchical isOrdered>
            <ListItem>Nested item 1</ListItem>
            <ListItem>Nested item 2</ListItem>
          </List>
        </ListItem>
        <ListItem>Subitem 3</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-3">Item 3</ListItem>,
  ],
  isHierarchical: true,
};

/**
 * List Stories - Ordered list
 */
export const Ordered = Template.bind({});
Ordered.args = {
  children: [
    <ListItem key="item-1">
      Item 1
      <List isOrdered>
        <ListItem>Subitem 1</ListItem>
        <ListItem>Subitem 2</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-2">
      Item 2
      <List isOrdered>
        <ListItem>Subitem 1</ListItem>
        <ListItem>
          Subitem 2
          <List isOrdered>
            <ListItem>Nested item 1</ListItem>
            <ListItem>Nested item 2</ListItem>
          </List>
        </ListItem>
        <ListItem>Subitem 3</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-3">Item 3</ListItem>,
  ],
  isOrdered: true,
};

/**
 * List Stories - Unordered list
 */
export const Unordered = Template.bind({});
Unordered.args = {
  children: [
    <ListItem key="item-1">
      Item 1
      <List>
        <ListItem>Subitem 1</ListItem>
        <ListItem>Subitem 2</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-2">
      Item 2
      <List isOrdered>
        <ListItem>Subitem 1</ListItem>
        <ListItem>
          Subitem 2
          <List>
            <ListItem>Nested item 1</ListItem>
            <ListItem>Nested item 2</ListItem>
          </List>
        </ListItem>
        <ListItem>Subitem 3</ListItem>
      </List>
    </ListItem>,
    <ListItem key="item-3">Item 3</ListItem>,
  ],
};

const items = [
  { id: 'item-1', label: 'Item 1' },
  { id: 'item-2', label: 'Item 2' },
  {
    id: 'item-3',
    label: (
      <>
        Item 3
        <List>
          <ListItem>Subitem 1</ListItem>
          <ListItem>Subitem 2</ListItem>
        </List>
      </>
    ),
  },
  { id: 'item-4', label: 'Item 4' },
  { id: 'item-5', label: 'Item 5' },
];

/**
 * List Stories - Inline and ordered list
 */
export const InlineOrdered = Template.bind({});
InlineOrdered.args = {
  children: items.map((item) => (
    <ListItem key={item.id}>{item.label}</ListItem>
  )),
  isInline: true,
  isOrdered: true,
  spacing: 'sm',
};

/**
 * List Stories - Inline and unordered list
 */
export const InlineUnordered = Template.bind({});
InlineUnordered.args = {
  children: items.map((item) => (
    <ListItem key={item.id}>{item.label}</ListItem>
  )),
  isInline: true,
  spacing: 'sm',
};

/**
 * List Stories - Ordered list without marker
 */
export const OrderedHideMarker = Template.bind({});
OrderedHideMarker.args = {
  children: items.map((item) => (
    <ListItem key={item.id}>{item.label}</ListItem>
  )),
  hideMarker: true,
  isOrdered: true,
};

/**
 * List Stories - Unordered list without marker
 */
export const UnorderedHideMarker = Template.bind({});
UnorderedHideMarker.args = {
  children: items.map((item) => (
    <ListItem key={item.id}>{item.label}</ListItem>
  )),
  hideMarker: true,
};
