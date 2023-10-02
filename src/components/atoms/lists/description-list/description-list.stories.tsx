import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Description } from './description';
import { DescriptionList } from './description-list';
import { Group } from './group';
import { Term } from './term';

/**
 * DescriptionList - Storybook Meta
 */
export default {
  title: 'Atoms/Lists/DescriptionList',
  component: DescriptionList,
  args: {
    isInline: false,
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
  },
} as ComponentMeta<typeof DescriptionList>;

const Template: ComponentStory<typeof DescriptionList> = (args) => (
  <DescriptionList {...args} />
);

/**
 * Description List Stories - Single term, single description
 */
export const SingleTermSingleDescription = Template.bind({});
SingleTermSingleDescription.args = {
  children: (
    <>
      <Term>A term</Term>
      <Description>A description of the term.</Description>
    </>
  ),
};

/**
 * Description List Stories - Multiple terms, single description
 */
export const MultipleTermsSingleDescription = Template.bind({});
MultipleTermsSingleDescription.args = {
  children: (
    <>
      <Term>A first term</Term>
      <Term>A second term</Term>
      <Term>A third term</Term>
      <Description>A description of the term.</Description>
    </>
  ),
};

/**
 * Description List Stories - Single term, multiple descriptions
 */
export const SingleTermMultipleDescriptions = Template.bind({});
SingleTermMultipleDescriptions.args = {
  children: (
    <>
      <Term>A term</Term>
      <Description>A first description of the term.</Description>
      <Description>A second description of the term.</Description>
      <Description>A third description of the term.</Description>
    </>
  ),
};

/**
 * Description List Stories - Multiple terms, multiple descriptions
 */
export const MultipleTermsMultipleDescriptions = Template.bind({});
MultipleTermsMultipleDescriptions.args = {
  children: (
    <>
      <Term>A first term</Term>
      <Term>A second term</Term>
      <Term>A third term</Term>
      <Description>A first description of the term.</Description>
      <Description>A second description of the term.</Description>
      <Description>A third description of the term.</Description>
    </>
  ),
};

/**
 * Description List Stories - Group of terms & descriptions
 */
export const GroupOfTermsDescriptions = Template.bind({});
GroupOfTermsDescriptions.args = {
  children: (
    <>
      <Group>
        <Term>A term</Term>
        <Description>A description of the term.</Description>
      </Group>
      <Group>
        <Term>Another term</Term>
        <Description>A description of the other term.</Description>
      </Group>
    </>
  ),
};

/**
 * Description List Stories - Inlined list of term and descriptions
 */
export const InlinedList = Template.bind({});
InlinedList.args = {
  children: (
    <>
      <Term>A term:</Term>
      <Description>A first description of the term.</Description>
      <Description>A second description of the term.</Description>
      <Description>A third description of the term.</Description>
    </>
  ),
  isInline: true,
  spacing: 'xs',
};

/**
 * Description List Stories - Inlined group of terms & descriptions
 */
export const InlinedGroupOfTermsDescriptions = Template.bind({});
InlinedGroupOfTermsDescriptions.args = {
  children: (
    <>
      <Group isInline spacing="2xs">
        <Term>A term:</Term>
        <Description>A description of the term.</Description>
      </Group>
      <Group isInline spacing="2xs">
        <Term>Another term:</Term>
        <Description>A description of the other term.</Description>
      </Group>
    </>
  ),
};
