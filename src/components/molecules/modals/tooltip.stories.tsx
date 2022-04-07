import { ComponentMeta, ComponentStory } from '@storybook/react';
import TooltipComponent from './tooltip';

export default {
  title: 'Molecules/Modals',
  component: TooltipComponent,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      description: 'The tooltip body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The tooltip title',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof TooltipComponent>;

const Template: ComponentStory<typeof TooltipComponent> = (args) => (
  <TooltipComponent {...args} />
);

export const Tooltip = Template.bind({});
Tooltip.args = {
  content:
    'Minima tempora fuga omnis ratione doloribus ut. Totam ea vitae consequatur. Fuga hic ipsum. In non debitis ex assumenda ut dicta. Sit ut maxime eligendi est.',
  icon: '?',
  title: 'Laborum enim vero',
};
