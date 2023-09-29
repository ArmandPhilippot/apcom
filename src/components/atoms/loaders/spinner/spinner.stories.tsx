import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Spinner as SpinnerComponent } from './spinner';

/**
 * Spinner - Storybook Meta
 */
export default {
  title: 'Atoms/Loaders',
  component: SpinnerComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'Loading message.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof SpinnerComponent>;

const Template: ComponentStory<typeof SpinnerComponent> = (args) => (
  <SpinnerComponent {...args} />
);

/**
 * Loaders Stories - Spinner
 */
export const Spinner = Template.bind({});
Spinner.args = {
  children: 'Submitting...',
};
