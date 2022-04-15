import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import LinksListWidget from './links-list-widget';

export default {
  title: 'Organisms/Widgets',
  component: LinksListWidget,
  args: {
    kind: 'unordered',
  },
  argTypes: {
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
  <IntlProvider locale="en">
    <LinksListWidget {...args} />
  </IntlProvider>
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

export const LinksList = Template.bind({});
LinksList.args = {
  items,
  level: 2,
  title: 'A list of links',
};
