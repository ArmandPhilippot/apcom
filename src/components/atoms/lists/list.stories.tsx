import { ComponentMeta, ComponentStory } from '@storybook/react';
import ListComponent, { type ListItem } from './list';

export default {
  title: 'Atoms/Lists',
  component: ListComponent,
  args: {
    kind: 'unordered',
  },
  argTypes: {
    classes: {
      control: {
        type: 'text',
      },
      description: 'Add additional classes to the list element.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      control: {
        type: null,
      },
      description: 'The list items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    kind: {
      control: {
        type: 'select',
      },
      description: 'The list kind: ordered or unordered.',
      options: ['ordered', 'unordered'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'unordered' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = (args) => (
  <ListComponent {...args} />
);

const items: ListItem[] = [
  { id: 'item-1', value: 'Item 1' },
  { id: 'item-2', value: 'Item 2' },
  {
    child: [
      { id: 'nested-item-1', value: 'Nested item 1' },
      { id: 'nested-item-2', value: 'Nested item 2' },
    ],
    id: 'item-3',
    value: 'Item 3',
  },
  { id: 'item-4', value: 'Item 4' },
];

export const Unordered = Template.bind({});
Unordered.args = {
  items,
};

export const Ordered = Template.bind({});
Ordered.args = {
  items,
  kind: 'ordered',
};
