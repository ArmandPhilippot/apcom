import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { type ChangeEvent, useState, useCallback } from 'react';
import { Input, Label } from '../../../atoms';
import { LabelledField } from './labelled-field';

/**
 * LabelledField - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Field',
  component: LabelledField,
  argTypes: {
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
    field: {
      control: {
        type: null,
      },
      description: 'A component: Checkbox, Input, Select, Radio or TextArea.',
      type: {
        name: 'function',
        required: true,
      },
    },
    label: {
      control: {
        type: null,
      },
      description: 'A Label component.',
      type: {
        name: 'function',
        required: true,
      },
    },
    isInline: {
      control: {
        type: 'boolean',
      },
      description: 'Should the label and the field be inlined?',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    isReversedOrder: {
      control: {
        type: 'boolean',
      },
      description: 'Should the label and the field be reversed?',
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
} as ComponentMeta<typeof LabelledField>;

const Template: ComponentStory<typeof LabelledField> = ({ ...args }) => {
  const id = 'sunt';
  const [value, setValue] = useState<string>('');
  const updateValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <LabelledField
      {...args}
      field={
        <Input
          id={id}
          name={id}
          onChange={updateValue}
          type="text"
          value={value}
        />
      }
      label={<Label htmlFor={id}>A label</Label>}
    />
  );
};

/**
 * Labelled Field Stories - Left
 */
export const Left = Template.bind({});
Left.args = {
  isInline: true,
};

/**
 * Labelled Field Stories - Right
 */
export const Right = Template.bind({});
Right.args = {
  isInline: true,
  isReversedOrder: true,
};

/**
 * Labelled Field Stories - Top
 */
export const Top = Template.bind({});
Top.args = {};

/**
 * Labelled Field Stories - Bottom
 */
export const Bottom = Template.bind({});
Bottom.args = {
  isReversedOrder: true,
};
