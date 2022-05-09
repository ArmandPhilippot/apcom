import { ComponentMeta, ComponentStory } from '@storybook/react';
import DescriptionList, { DescriptionListItem } from './description-list';

/**
 * DescriptionList - Storybook Meta
 */
export default {
  title: 'Atoms/Typography/Lists/DescriptionList',
  component: DescriptionList,
  args: {
    layout: 'column',
    withSeparator: false,
  },
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
    groupClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the item wrapper.',
      table: {
        category: 'Styles',
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
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    layout: {
      control: {
        type: 'select',
      },
      description: 'The list layout.',
      options: ['column', 'inline'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'column' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    valueClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the value wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    withSeparator: {
      control: {
        type: 'boolean',
      },
      description: 'Add a slash as separator between multiple values.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof DescriptionList>;

const Template: ComponentStory<typeof DescriptionList> = (args) => (
  <DescriptionList {...args} />
);

const items: DescriptionListItem[] = [
  { id: 'term-1', label: 'Term 1:', value: ['Value for term 1'] },
  { id: 'term-2', label: 'Term 2:', value: ['Value for term 2'] },
  {
    id: 'term-3',
    label: 'Term 3:',
    value: ['Value 1 for term 3', 'Value 2 for term 3', 'Value 3 for term 3'],
  },
  { id: 'term-4', label: 'Term 4:', value: ['Value for term 4'] },
];

/**
 * List Stories - Description list
 */
export const List = Template.bind({});
List.args = {
  items,
};
