import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProgressBarComponent from './progress-bar';

export default {
  title: 'Atoms/Loaders',
  component: ProgressBarComponent,
  argTypes: {
    ariaLabel: {
      control: {
        type: 'string',
      },
      description: 'An accessible name.',
      type: {
        name: 'string',
        required: false,
      },
    },
    current: {
      control: {
        type: 'number',
      },
      description: 'The current value.',
      type: {
        name: 'number',
        required: true,
      },
    },
    info: {
      control: {
        type: 'text',
      },
      description: 'An additional information to display.',
      type: {
        name: 'string',
        required: false,
      },
    },
    max: {
      control: {
        type: 'number',
      },
      description: 'The maximal value.',
      type: {
        name: 'number',
        required: true,
      },
    },
    min: {
      control: {
        type: 'number',
      },
      description: 'The minimal value.',
      type: {
        name: 'number',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ProgressBarComponent>;

const Template: ComponentStory<typeof ProgressBarComponent> = (args) => (
  <ProgressBarComponent {...args} />
);

export const ProgressBar = Template.bind({});
ProgressBar.args = {
  current: 10,
  min: 0,
  max: 50,
};
