import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioGroup from './radio-group';
import { getOptions, initialChoice, legend } from './radio-group.fixture';

/**
 * RadioGroup - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/RadioGroup',
  component: RadioGroup,
  args: {
    labelSize: 'small',
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the fieldset.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    initialChoice: {
      control: {
        type: 'text',
      },
      description: 'The default selected option id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    labelPosition: {
      control: {
        type: 'select',
      },
      description: 'Determine the label position.',
      options: ['left', 'right'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'left' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    labelSize: {
      control: {
        type: 'select',
      },
      description: 'The label size.',
      options: ['medium', 'small'],
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legend: {
      control: {
        type: 'text',
      },
      description: 'The fieldset legend.',
      type: {
        name: 'string',
        required: true,
      },
    },
    legendClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the legend.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    legendPosition: {
      control: {
        type: 'select',
      },
      description: 'Determine the legend position.',
      options: ['inline', 'stacked'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'inline' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    options: {
      description: 'An array of radio option object.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup {...args} />
);

/**
 * Radio Group Stories - Inlined legend & left label
 */
export const InlinedLegendLeftLabel = Template.bind({});
InlinedLegendLeftLabel.args = {
  initialChoice: initialChoice,
  labelPosition: 'left',
  legend: legend,
  legendPosition: 'inline',
  options: getOptions('group1'),
};

/**
 * Radio Group Stories - Inlined legend & left label
 */
export const InlinedLegendRightLabel = Template.bind({});
InlinedLegendRightLabel.args = {
  initialChoice: initialChoice,
  labelPosition: 'right',
  legend: legend,
  legendPosition: 'inline',
  options: getOptions('group2'),
};

/**
 * Radio Group Stories - Stacked legend & left label
 */
export const StackedLegendLeftLabel = Template.bind({});
StackedLegendLeftLabel.args = {
  initialChoice: initialChoice,
  labelPosition: 'left',
  legend: legend,
  legendPosition: 'stacked',
  options: getOptions('group3'),
};

/**
 * Radio Group Stories - Stacked legend & left label
 */
export const StackedLegendRightLabel = Template.bind({});
StackedLegendRightLabel.args = {
  initialChoice: initialChoice,
  labelPosition: 'right',
  legend: legend,
  legendPosition: 'stacked',
  options: getOptions('group4'),
};
