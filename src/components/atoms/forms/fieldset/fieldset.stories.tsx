import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Fieldset as FieldsetComponent } from './fieldset';
import { Input } from '../fields';
import { Legend } from '../legend';

/**
 * Fieldset - Storybook Meta
 */
export default {
  title: 'Atoms/Forms',
  component: FieldsetComponent,
  args: {
    isDisabled: false,
  },
  argTypes: {
    isDisabled: {
      control: {
        type: 'boolean',
      },
      description:
        'Define if the fields inside the fieldset should be disabled.',
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
} as ComponentMeta<typeof FieldsetComponent>;

const Template: ComponentStory<typeof FieldsetComponent> = (args) => {
  return (
    <FieldsetComponent {...args}>
      <div>
        <Input
          aria-label="A field example"
          id="field1"
          name="field1"
          type="text"
        />
      </div>
      <div>
        <Input
          aria-label="Another field example"
          id="field2"
          name="field2"
          type="text"
        />
      </div>
    </FieldsetComponent>
  );
};

/**
 * Fieldset Story
 */
export const Fieldset = Template.bind({});
Fieldset.args = {
  legend: <Legend>The fieldset legend</Legend>,
};
