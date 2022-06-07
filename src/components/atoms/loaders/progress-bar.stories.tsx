import { ComponentMeta, ComponentStory } from '@storybook/react';
import ProgressBarComponent from './progress-bar';
import { current, id, label, max, min } from './progress-bar.fixture';

/**
 * ProgressBar - Storybook Meta
 */
export default {
  title: 'Atoms/Loaders',
  component: ProgressBarComponent,
  argTypes: {
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
    id: {
      control: {
        type: 'text',
      },
      description: 'The progress bar id.',
      type: {
        name: 'string',
        required: true,
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'The progress bar label.',
      type: {
        name: 'string',
        required: true,
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
 * Loaders Stories - Progress bar
 */
export const ProgressBar = Template.bind({});
ProgressBar.args = {
  current,
  id,
  label,
  min,
  max,
};
