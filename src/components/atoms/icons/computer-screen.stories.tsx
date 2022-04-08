import { ComponentMeta, ComponentStory } from '@storybook/react';
import ComputerScreenIcon from './computer-screen';

export default {
  title: 'Atoms/Icons',
  component: ComputerScreenIcon,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ComputerScreenIcon>;

const Template: ComponentStory<typeof ComputerScreenIcon> = (args) => (
  <ComputerScreenIcon {...args} />
);

export const ComputerScreen = Template.bind({});
