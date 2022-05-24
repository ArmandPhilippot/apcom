import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArrowIcon from './arrow';

/**
 * Arrow icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: ArrowIcon,
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
    direction: {
      control: {
        type: 'select',
      },
      description: 'An arrow icon.',
      options: ['bottom', 'left', 'right', 'top'],
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ArrowIcon>;

const Template: ComponentStory<typeof ArrowIcon> = (args) => (
  <ArrowIcon {...args} />
);

/**
 * Icons Stories - Arrow
 */
export const Arrow = Template.bind({});
Arrow.args = {
  direction: 'right',
};
