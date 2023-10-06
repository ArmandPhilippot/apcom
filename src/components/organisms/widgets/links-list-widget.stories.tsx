import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../atoms';
import { LinksListWidget } from './links-list-widget';

/**
 * LinksListWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/LinksList',
  component: LinksListWidget,
  args: {
    isOrdered: false,
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
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  items,
};

/**
 * Links List Widget Stories - Ordered
 */
export const Ordered = Template.bind({});
Ordered.args = {
  heading: (
    <Heading isFake level={3}>
      Quo et totam
    </Heading>
  ),
  isOrdered: true,
  items,
};
