import type { Meta, StoryObj } from '@storybook/react';
import { Description } from './description';
import { DescriptionList } from './description-list';
import { Group } from './group';
import { Term } from './term';

const meta = {
  component: DescriptionList,
  title: 'Atoms/Lists/Description List',
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    children: [
      <Term key="term">A term</Term>,
      <Description key="description">A description of the term.</Description>,
    ],
  },
};

export const SingleTermSingleDescription: Story = {
  args: {
    ...Default.args,
  },
};

export const MultipleTermsSingleDescription: Story = {
  args: {
    ...Default.args,
    children: [
      <Term key="term-1">First term</Term>,
      <Term key="term-2">Second term</Term>,
      <Term key="term-3">Third term</Term>,
      <Description key="description-1">Description of the terms</Description>,
    ],
  },
};

export const SingleTermMultipleDescriptions: Story = {
  args: {
    ...Default.args,
    children: [
      <Term key="term-1">A term</Term>,
      <Description key="description-1">
        First description of the term
      </Description>,
      <Description key="description-2">
        Second description of the term
      </Description>,
      <Description key="description-3">
        Third description of the term
      </Description>,
    ],
  },
};

export const MultipleTermsMultipleDescriptions: Story = {
  args: {
    ...Default.args,
    children: [
      <Term key="term-1">First term</Term>,
      <Description key="description-1">
        Description of the first term
      </Description>,
      <Term key="term-2">Second term</Term>,
      <Term key="term-2-alternative">Alternative of second term</Term>,
      <Description key="description-2">
        Description of the second term
      </Description>,
      <Term key="term-3">Third term</Term>,
      <Description key="first-description-3">
        First description of the third term
      </Description>,
      <Description key="second-description-3">
        Second description of the third term
      </Description>,
    ],
  },
};

export const GroupOfMultipleTermsMultipleDescriptions: Story = {
  args: {
    ...Default.args,
    children: [
      <Group key="group-1">
        <Term>First term</Term>
        <Description>Description of the first term</Description>
      </Group>,
      <Group key="group-2">
        <Term>Second term</Term>
        <Term>Alternative of second term</Term>
        <Description>Description of the second term</Description>
      </Group>,
      <Group key="group-3">
        <Term>Third term</Term>
        <Description>First description of the third term</Description>
        <Description>Second description of the third term</Description>
      </Group>,
    ],
  },
};

export const SpacingXXSWithoutGroup: Story = {
  name: 'Spacing: Double extra-small (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: '2xs',
  },
};

export const SpacingXSWithoutGroup: Story = {
  name: 'Spacing: Extra-small (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: 'xs',
  },
};

export const SpacingSMWithoutGroup: Story = {
  name: 'Spacing: Small (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: 'sm',
  },
};

export const SpacingMDWithoutGroup: Story = {
  name: 'Spacing: Medium (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: 'md',
  },
};

export const SpacingLGWithoutGroup: Story = {
  name: 'Spacing: Large (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: 'lg',
  },
};

export const SpacingXLWithoutGroup: Story = {
  name: 'Spacing: Extra-large (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: 'xl',
  },
};

export const SpacingXXLWithoutGroup: Story = {
  name: 'Spacing: Double extra-large (without group)',
  args: {
    ...MultipleTermsMultipleDescriptions.args,
    spacing: '2xl',
  },
};

export const SpacingXXSWithGroup: Story = {
  name: 'Spacing: Double extra-small (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: '2xs',
  },
};

export const SpacingXSWithGroup: Story = {
  name: 'Spacing: Extra-small (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: 'xs',
  },
};

export const SpacingSMWithGroup: Story = {
  name: 'Spacing: Small (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: 'sm',
  },
};

export const SpacingMDWithGroup: Story = {
  name: 'Spacing: Medium (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: 'md',
  },
};

export const SpacingLGWithGroup: Story = {
  name: 'Spacing: Large (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: 'lg',
  },
};

export const SpacingXLWithGroup: Story = {
  name: 'Spacing: Extra-large (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: 'xl',
  },
};

export const SpacingXXLWithGroup: Story = {
  name: 'Spacing: Double extra-large (with group)',
  args: {
    ...GroupOfMultipleTermsMultipleDescriptions.args,
    spacing: '2xl',
  },
};

export const InlinedWithoutGroups: Story = {
  name: 'Alignment: inlined without groups',
  args: {
    ...Default.args,
    children: [
      <Term key="term1">A term</Term>,
      <Description key="description1">A description.</Description>,
      <Term key="term2">Another term</Term>,
      <Description key="description2">Another description.</Description>,
    ],
    isInline: true,
    spacing: 'xs',
  },
};

export const InlinedWithGroups: Story = {
  name: 'Alignment: inlined with groups',
  args: {
    ...Default.args,
    children: [
      <Group key="group1">
        <Term>A term</Term>
        <Description>A description.</Description>
      </Group>,
      <Group key="group2">
        <Term>Another term</Term>
        <Description>Another description.</Description>
      </Group>,
    ],
    isInline: true,
    spacing: 'xs',
  },
};

export const InlinedWithInlinedGroups: Story = {
  name: 'Alignment: inlined with inlined groups',
  args: {
    ...Default.args,
    children: [
      <Group key="group1" isInline spacing="xs">
        <Term>A term</Term>
        <Description>A description.</Description>
      </Group>,
      <Group key="group2" isInline spacing="xs">
        <Term>Another term</Term>
        <Description>Another description.</Description>
      </Group>,
    ],
    isInline: true,
    spacing: 'xs',
  },
};
