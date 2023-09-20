import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DescriptionListGroup } from './description-list-group';

export default {
  title: 'Atoms/Typography/Lists/DescriptionList/Item',
  component: DescriptionListGroup,
  args: {
    layout: 'stacked',
    withSeparator: false,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list item wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    descriptionClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list item description.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    layout: {
      control: {
        type: 'select',
      },
      description: 'The item layout.',
      options: ['inline', 'inline-values', 'stacked'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'stacked' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    termClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the list item term.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    value: {
      description: 'The item value.',
      type: {
        name: 'object',
        required: true,
        value: {},
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
} as ComponentMeta<typeof DescriptionListGroup>;

const Template: ComponentStory<typeof DescriptionListGroup> = (args) => (
  <DescriptionListGroup {...args} />
);

export const SingleValueStacked = Template.bind({});
SingleValueStacked.args = {
  label: 'Recusandae vitae tenetur',
  value: ['praesentium'],
  layout: 'stacked',
};

export const SingleValueInlined = Template.bind({});
SingleValueInlined.args = {
  label: 'Recusandae vitae tenetur',
  value: ['praesentium'],
  layout: 'inline',
};

export const MultipleValuesStacked = Template.bind({});
MultipleValuesStacked.args = {
  label: 'Recusandae vitae tenetur',
  value: ['praesentium', 'voluptate', 'tempore'],
  layout: 'stacked',
};

export const MultipleValuesInlined = Template.bind({});
MultipleValuesInlined.args = {
  label: 'Recusandae vitae tenetur',
  value: ['praesentium', 'voluptate', 'tempore'],
  layout: 'inline-values',
  withSeparator: true,
};
