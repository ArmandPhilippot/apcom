import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../../atoms';
import { LinksWidget, type LinksWidgetItemData } from './links-widget';

/**
 * LinksWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/Links',
  component: LinksWidget,
  args: {
    isOrdered: false,
  },
  argTypes: {
    items: {
      description: 'The links data.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof LinksWidget>;

const Template: ComponentStory<typeof LinksWidget> = (args) => (
  <LinksWidget {...args} />
);

const items = [
  { id: 'item11', label: 'Level 1: Item 1', url: '#' },
  {
    id: 'item12',
    label: 'Level 1: Item 2',
    url: '#',
    child: [
      { id: 'item21', label: 'Level 2: Item 1', url: '#' },
      { id: 'item22', label: 'Level 2: Item 2', url: '#' },
      {
        id: 'item23',
        label: 'Level 2: Item 3',
        url: '#',
        child: [
          { id: 'item31', label: 'Level 3: Item 1', url: '#' },
          { id: 'item32', label: 'Level 3: Item 2', url: '#' },
        ],
      },
      { id: 'item24', label: 'Level 2: Item 4', url: '#' },
    ],
  },
  { id: 'item13', label: 'Level 1: Item 3', url: '#' },
  { id: 'item14', label: 'Level 1: Item 4', url: '#' },
] satisfies LinksWidgetItemData[];

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
