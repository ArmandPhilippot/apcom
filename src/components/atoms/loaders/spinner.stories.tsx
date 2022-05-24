import { ComponentMeta, ComponentStory } from '@storybook/react';
import SpinnerComponent from './spinner';

/**
 * Spinner - Storybook Meta
 */
export default {
  title: 'Atoms/Loaders/Spinner',
  component: SpinnerComponent,
  argTypes: {
    message: {
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
 * Loaders Stories - Default Spinner
 */
export const Spinner = Template.bind({});

/**
 * Loaders Stories - Spinner with custom message
 */
export const SpinnerCustomMessage = Template.bind({});
SpinnerCustomMessage.args = {
  message: 'Submitting...',
};
