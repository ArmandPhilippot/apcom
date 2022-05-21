import { ComponentMeta, ComponentStory } from '@storybook/react';
import LinksListWidget from './links-list-widget';

/**
 * LinksListWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/LinksList',
  component: LinksListWidget,
  args: {
    kind: 'unordered',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      description: 'The widget data.',
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
      description: 'The list kind: either ordered or unordered.',
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
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The heading level.',
      type: {
        name: 'number',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The widget title.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof LinksListWidget>;

const Template: ComponentStory<typeof LinksListWidget> = (args) => (
  <LinksListWidget {...args} />
);

const items = [
  { name: 'Level 1: Item 1', url: '#' },
  {
    name: 'Level 1: Item 2',
    url: '#',
    child: [
      { name: 'Level 2: Item 1', url: '#' },
      { name: 'Level 2: Item 2', url: '#' },
      {
        name: 'Level 2: Item 3',
        url: '#',
        child: [
          { name: 'Level 3: Item 1', url: '#' },
          { name: 'Level 3: Item 2', url: '#' },
        ],
      },
      { name: 'Level 2: Item 4', url: '#' },
    ],
  },
  { name: 'Level 1: Item 3', url: '#' },
  { name: 'Level 1: Item 4', url: '#' },
];

/**
 * Links List Widget Stories - Unordered
 */
export const Unordered = Template.bind({});
Unordered.args = {
  items,
  kind: 'unordered',
  level: 2,
  title: 'A list of links',
};

/**
 * Links List Widget Stories - Ordered
 */
export const Ordered = Template.bind({});
Ordered.args = {
  items,
  kind: 'ordered',
  level: 2,
  title: 'A list of links',
};
