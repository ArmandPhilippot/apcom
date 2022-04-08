import { ComponentMeta, ComponentStory } from '@storybook/react';
import CareerIcon from './career';

export default {
  title: 'Atoms/Icons',
  component: CareerIcon,
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
} as ComponentMeta<typeof CareerIcon>;

const Template: ComponentStory<typeof CareerIcon> = (args) => (
  <CareerIcon {...args} />
);

export const Career = Template.bind({});
