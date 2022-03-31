import { ComponentMeta, ComponentStory } from '@storybook/react';
import LabelComponent from './label';

export default {
  title: 'Atoms/Forms',
  component: LabelComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The label body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      description: 'The field id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Set to true if the field is required.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof LabelComponent>;

const Template: ComponentStory<typeof LabelComponent> = (args) => {
  const { children, ...props } = args;
  return <LabelComponent {...props}>{children}</LabelComponent>;
};

export const Label = Template.bind({});
Label.args = {
  children: 'A label',
  htmlFor: 'a-field-id',
};
