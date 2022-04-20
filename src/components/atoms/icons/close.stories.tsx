import { ComponentMeta, ComponentStory } from '@storybook/react';
import CloseIcon from './close';

/**
 * Close icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: CloseIcon,
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
} as ComponentMeta<typeof CloseIcon>;

const Template: ComponentStory<typeof CloseIcon> = (args) => (
  <CloseIcon {...args} />
);

/**
 * Icons Stories - Close
 */
export const Close = Template.bind({});
