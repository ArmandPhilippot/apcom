import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback, useState } from 'react';
import {
  Checkbox,
  type CheckboxProps,
  Radio,
  type RadioProps,
  Input,
  type InputProps,
  type TextAreaProps,
  TextArea,
  Label,
} from '../../../atoms';
import { ControlledSelect } from '../../../atoms/forms/fields/select/select.stories';
import { LabelledField } from './labelled-field';

const meta = {
  title: 'Molecules/Forms/Labelled Field',
  component: LabelledField,
} satisfies Meta<typeof LabelledField>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledCheckbox = ({
  isChecked: checked = false,
  ...args
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }, []);

  return <Checkbox {...args} isChecked={isChecked} onChange={handleChange} />;
};

const ControlledInput = ({ value: defaultValue, ...args }: InputProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return <Input {...args} onChange={handleChange} value={value} />;
};

const ControlledRadio = ({
  isChecked: checked = false,
  ...args
}: RadioProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }, []);

  return <Radio {...args} isChecked={isChecked} onChange={handleChange} />;
};

const ControlledTextArea = ({
  value: defaultValue,
  ...args
}: TextAreaProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  return <TextArea {...args} onChange={handleChange} value={value} />;
};

export const Default: Story = {
  args: {
    field: (
      <ControlledInput id="default-field" name="default-field" type="text" />
    ),
    label: <Label>A field label</Label>,
  },
};

export const LabelledCheckbox: Story = {
  name: 'Field: Checkbox',
  args: {
    ...Default.args,
    field: (
      <ControlledCheckbox
        id="checkbox-field"
        name="checkbox-field"
        value="checkbox-field"
      />
    ),
  },
};

export const LabelledRadio: Story = {
  name: 'Field: Radio',
  args: {
    ...Default.args,
    field: (
      <ControlledRadio
        id="radio-field"
        name="radio-field"
        value="radio-field"
      />
    ),
  },
};

export const LabelledDateField: Story = {
  name: 'Field: Date',
  args: {
    ...Default.args,
    field: <ControlledInput id="date-field" name="date-field" type="date" />,
  },
};

export const LabelledDateTimeField: Story = {
  name: 'Field: Datetime',
  args: {
    ...Default.args,
    field: (
      <ControlledInput
        id="datetime-field"
        name="datetime-field"
        type="datetime-local"
      />
    ),
  },
};

export const LabelledEmailField: Story = {
  name: 'Field: Email',
  args: {
    ...Default.args,
    field: <ControlledInput id="email-field" name="email-field" type="email" />,
  },
};

export const LabelledMonthField: Story = {
  name: 'Field: Month',
  args: {
    ...Default.args,
    field: <ControlledInput id="month-field" name="month-field" type="month" />,
  },
};

export const LabelledNumberField: Story = {
  name: 'Field: Number',
  args: {
    ...Default.args,
    field: (
      <ControlledInput id="number-field" name="number-field" type="number" />
    ),
  },
};

export const LabelledPasswordField: Story = {
  name: 'Field: Password',
  args: {
    ...Default.args,
    field: (
      <ControlledInput
        id="password-field"
        name="password-field"
        type="password"
      />
    ),
  },
};

export const LabelledSearchField: Story = {
  name: 'Field: Search',
  args: {
    ...Default.args,
    field: (
      <ControlledInput id="search-field" name="search-field" type="search" />
    ),
  },
};

export const LabelledSelect: Story = {
  name: 'Field: Select',
  args: {
    ...Default.args,
    field: (
      <ControlledSelect
        id="select-field"
        name="select-field"
        options={[]}
        value=""
      />
    ),
  },
};

export const LabelledTelField: Story = {
  name: 'Field: Tel',
  args: {
    ...Default.args,
    field: <ControlledInput id="tel-field" name="tel-field" type="tel" />,
  },
};

export const LabelledTextField: Story = {
  name: 'Field: Text',
  args: {
    ...Default.args,
  },
};

export const LabelledTextArea: Story = {
  name: 'Field: Textarea',
  args: {
    ...Default.args,
    field: <ControlledTextArea id="textarea-field" name="textarea-field" />,
  },
};

export const LabelledTimeField: Story = {
  name: 'Field: Time',
  args: {
    ...Default.args,
    field: <ControlledInput id="time-field" name="time-field" type="time" />,
  },
};

export const LabelledUrlField: Story = {
  name: 'Field: Url',
  args: {
    ...Default.args,
    field: <ControlledInput id="url-field" name="url-field" type="url" />,
  },
};

export const LayoutColumn: Story = {
  name: 'Layout: Column',
  args: {
    ...LabelledCheckbox.args,
    isInline: false,
  },
};

export const LayoutReversedColumn: Story = {
  name: 'Layout: Reversed column',
  args: {
    ...LabelledCheckbox.args,
    isInline: false,
    isReversedOrder: true,
  },
};

export const LayoutRow: Story = {
  name: 'Layout: Row',
  args: {
    ...LabelledCheckbox.args,
    isInline: true,
  },
};

export const LayoutReversedRow: Story = {
  name: 'Layout: Reversed row',
  args: {
    ...LabelledCheckbox.args,
    isInline: true,
    isReversedOrder: true,
  },
};
