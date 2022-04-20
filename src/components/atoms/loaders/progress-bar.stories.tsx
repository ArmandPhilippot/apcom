import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProgressBarComponent from './progress-bar';

/**
 * ProgressBar - Storybook Meta
 */
export default {
  title: 'Atoms/Loaders/ProgressBar',
  component: ProgressBarComponent,
  argTypes: {
    'aria-label': {
      control: {
        type: 'string',
      },
      description: 'An accessible name.',
      table: {
        category: 'Accessibility',
      },
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
      table: {
        category: 'Options',
      },
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

/**
 * Loaders Stories - Default Progress bar
 */
export const ProgressBar = Template.bind({});
ProgressBar.args = {
  current: 10,
  min: 0,
  max: 50,
};

/**
 * Loaders Stories - Progress bar With Info
 */
export const ProgressBarWithInfo = Template.bind({});
ProgressBarWithInfo.args = {
  current: 10,
  info: 'Loaded: 10 / 50',
  min: 0,
  max: 50,
};
