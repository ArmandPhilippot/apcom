import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { type ChangeEvent, useCallback, useState } from 'react';
import { TextArea as TextAreaComponent } from './text-area';

/**
 * TextArea - Storybook Meta
 */
export default {
  title: 'Atoms/Forms/Fields',
  component: TextAreaComponent,
  args: {
    isDisabled: false,
    isRequired: false,
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
      description: 'Add classnames to the field.',
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
      description: 'TextArea id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
      description: 'TextArea state: either enabled or disabled.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isRequired: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if the field is required.',
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
      description: 'TextArea name.',
      type: {
        name: 'string',
        required: true,
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'A placeholder value.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    value: {
      control: {
        type: null,
      },
      description: 'TextArea value.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof TextAreaComponent>;

const Template: ComponentStory<typeof TextAreaComponent> = ({
  value: initialValue,
  onChange: _onChange,
  ...args
}) => {
  const [value, setValue] = useState(initialValue);
  const updateValue = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  return <TextAreaComponent value={value} onChange={updateValue} {...args} />;
};

/**
 * TextArea Story - TextArea
 */
export const TextArea = Template.bind({});
TextArea.args = {
  id: 'field-storybook',
  name: 'field-storybook',
};
