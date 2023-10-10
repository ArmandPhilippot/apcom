import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from '../../../atoms';
import { MetaItem } from './meta-item';

/**
 * MetaItem - Storybook Meta
 */
export default {
  title: 'Molecules/MetaList/Item',
  component: MetaItem,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The item label.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MetaItem>;

const Template: ComponentStory<typeof MetaItem> = (args) => (
  <MetaItem {...args} />
);

/**
 * MetaItem Stories - SingleValue
 */
export const SingleValue = Template.bind({});
SingleValue.args = {
  label: 'Comments',
  value: 'No comments',
};

/**
 * MetaItem Stories - MultipleValues
 */
export const MultipleValues = Template.bind({});
MultipleValues.args = {
  label: 'Tags',
  value: [
    { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
    { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
  ],
};

/**
 * MetaItem Stories - SingleValueBordered
 */
export const SingleValueBordered = Template.bind({});
SingleValueBordered.args = {
  hasBorderedValues: true,
  label: 'Comments',
  value: 'No comments',
};

/**
 * MetaItem Stories - MultipleValuesBordered
 */
export const MultipleValuesBordered = Template.bind({});
MultipleValuesBordered.args = {
  hasBorderedValues: true,
  label: 'Tags',
  value: [
    { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
    { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
  ],
};

/**
 * MetaItem Stories - SingleValueInlined
 */
export const SingleValueInlined = Template.bind({});
SingleValueInlined.args = {
  isInline: true,
  label: 'Comments',
  value: 'No comments',
};

/**
 * MetaItem Stories - MultipleValuesInlined
 */
export const MultipleValuesInlined = Template.bind({});
MultipleValuesInlined.args = {
  isInline: true,
  label: 'Tags',
  value: [
    { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
    { id: 'tag2', value: <Link href="#tag2">Tag 2</Link> },
  ],
};

/**
 * MetaItem Stories - InlinedValues
 */
export const InlinedValues = Template.bind({});
InlinedValues.args = {
  hasInlinedValues: true,
  label: 'Tags',
  value: [
    { id: 'tag1', value: <Link href="#tag1">Tag 1</Link> },
    { id: 'tag2', value: <Link href="#tag2">A long tag 2</Link> },
    { id: 'tag3', value: <Link href="#tag3">Tag 3</Link> },
  ],
};
