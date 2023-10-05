import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useState } from 'react';
import { BooleanField } from './boolean-field';

/**
 * BooleanField - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fields',
  component: BooleanField,
  args: {
    isHidden: false,
  },
  argTypes: {
    'aria-labelledby': {
      control: {
        type: 'text',
      },
      description: 'One or more ids that refers to the field name.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    className: {
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
    id: {
      control: {
        type: 'text',
      },
      description: 'The field id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isChecked: {
      control: {
        type: null,
      },
      description: 'The field state: true if checked.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    isHidden: {
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
} as ComponentMeta<typeof BooleanField>;

const Template: ComponentStory<typeof BooleanField> = ({
  isChecked: checked,
  onChange: _onChange,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  return (
    <BooleanField isChecked={isChecked} onChange={handleChange} {...args} />
  );
};

/**
 * Checkbox Story
 */
export const Checkbox = Template.bind({});
Checkbox.args = {
  id: 'checkbox',
  isChecked: false,
  name: 'checkbox',
  type: 'checkbox',
  value: 'checkbox',
};

/**
 * Radio Story
 */
export const Radio = Template.bind({});
Radio.args = {
  id: 'radio',
  isChecked: false,
  name: 'radio',
  type: 'radio',
  value: 'radio',
};
