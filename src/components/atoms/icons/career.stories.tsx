import { ComponentMeta, ComponentStory } from '@storybook/react';
import CareerIcon from './career';

/**
 * Career icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
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

/**
 * Icons Stories - Career
 */
export const Career = Template.bind({});
