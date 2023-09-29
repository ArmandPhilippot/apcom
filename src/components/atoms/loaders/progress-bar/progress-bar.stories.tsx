import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProgressBar as ProgressBarComponent } from './progress-bar';

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
  },
} as ComponentMeta<typeof ProgressBarComponent>;

const Template: ComponentStory<typeof ProgressBarComponent> = (args) => (
  <ProgressBarComponent {...args} />
);

const max = 50;
const current = 10;
const label = `${current} loaded out of a total of ${max}`;

/**
 * Loaders Stories - Progress bar
 */
export const ProgressBar = Template.bind({});
ProgressBar.args = {
  current,
  label,
  max,
};
