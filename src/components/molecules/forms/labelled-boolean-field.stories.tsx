import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import LabelledBooleanField from './labelled-boolean-field';
import { label } from './labelled-boolean-field.fixture';

/**
 * LabelledBooleanField - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Boolean',
  component: LabelledBooleanField,
  args: {
    checked: false,
    hidden: false,
    label,
    labelSize: 'small',
  },
  argTypes: {
    checked: {
      control: {
        type: null,
      },
      description: 'Should the option be checked?',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the labelled field wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    fieldClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the field.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    hidden: {
      control: {
        type: 'boolean',
      },
      description: 'Define if the field should be visually hidden.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'The option id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'The radio label.',
      type: {
        name: 'string',
        required: true,
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
    name: {
      control: {
        type: 'text',
      },
      description: 'The field name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    onChange: {
      control: {
        type: null,
      },
      description: 'A callback function to handle field state change.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: true,
      },
    },
    onClick: {
      control: {
        type: null,
      },
      description: 'A callback function to handle click on field.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    type: {
      control: {
        type: 'select',
      },
      description: 'The field type. Either checkbox or radio.',
      options: ['checkbox', 'radio'],
      type: {
        name: 'string',
        required: true,
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'The field value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof LabelledBooleanField>;

const Template: ComponentStory<typeof LabelledBooleanField> = ({
  checked,
  onChange: _onChange,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  return (
    <LabelledBooleanField
      checked={isChecked}
      onChange={() => {
        setIsChecked(!isChecked);
      }}
      {...args}
    />
  );
};

/**
 * Labelled Boolean Field Stories - Checkbox with left label
 */
export const CheckboxLeftLabel = Template.bind({});
CheckboxLeftLabel.args = {
  id: 'checkbox',
  labelPosition: 'left',
  name: 'checkbox-left-label',
  type: 'checkbox',
  value: 'checkbox',
};

/**
 * Labelled Boolean Field Stories - Checkbox with right label
 */
export const CheckboxRightLabel = Template.bind({});
CheckboxRightLabel.args = {
  id: 'checkbox',
  labelPosition: 'right',
  name: 'checkbox-right-label',
  type: 'checkbox',
};

/**
 * Labelled Boolean Field Stories - Radio button with left label
 */
export const RadioButtonLeftLabel = Template.bind({});
RadioButtonLeftLabel.args = {
  id: 'radio',
  labelPosition: 'left',
  name: 'radio-left-label',
  type: 'radio',
  value: 'radio',
};

/**
 * Labelled Boolean Field Stories - Radio button with right label
 */
export const RadioButtonRightLabel = Template.bind({});
RadioButtonRightLabel.args = {
  id: 'radio',
  labelPosition: 'right',
  name: 'radio-right-label',
  type: 'radio',
  value: 'radio',
};
