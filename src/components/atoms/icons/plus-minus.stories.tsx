import { ComponentMeta, ComponentStory } from '@storybook/react';
import PlusMinusIcon from './plus-minus';

/**
 * Plus/Minus icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: PlusMinusIcon,
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
    state: {
      control: {
        type: 'radio',
        options: ['plus', 'minus'],
      },
      description: 'Which state should be displayed.',
      type: {
        name: 'enum',
        required: true,
        value: ['plus', 'minus'],
      },
    },
  },
} as ComponentMeta<typeof PlusMinusIcon>;

const Template: ComponentStory<typeof PlusMinusIcon> = (args) => (
  <PlusMinusIcon {...args} />
);

/**
 * Icons Stories - Plus/Minus
 */
export const PlusMinus = Template.bind({});
PlusMinus.args = {
  state: 'plus',
};
