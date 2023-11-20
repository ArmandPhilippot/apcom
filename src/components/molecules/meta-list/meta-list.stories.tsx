import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from '../../atoms';
import { MetaItem } from './meta-item';
import { MetaList } from './meta-list';

/**
 * MetaList - Storybook Meta
 */
export default {
  title: 'Molecules/MetaList',
  component: MetaList,
  argTypes: {
    items: {
      description: 'The meta items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof MetaList>;

const Template: ComponentStory<typeof MetaList> = (args) => (
  <MetaList {...args} />
);

const items = [
  { id: 'comments', label: 'Comments', value: 'No comments.' },
  {
    id: 'category',
    label: 'Category',
    value: <Link href="#cat1">Cat 1</Link>,
  },
  {
    id: 'tags',
    label: 'Tags',
    value: [
      { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
      { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
    ],
  },
  {
    hasBorderedValues: true,
    hasInlinedValues: true,
    id: 'technologies',
    label: 'Technologies',
    value: [
      { id: 'techno1', value: 'HTML' },
      { id: 'techno2', value: 'CSS' },
      { id: 'techno3', value: 'Javascript' },
    ],
  },
];

/**
 * MetaList Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: items.map(({ id, ...item }) => <MetaItem key={id} {...item} />),
};

/**
 * MetaList Stories - Inlined
 */
export const Inlined = Template.bind({});
Inlined.args = {
  children: items.map(({ id, ...item }) => <MetaItem key={id} {...item} />),
  isInline: true,
};
