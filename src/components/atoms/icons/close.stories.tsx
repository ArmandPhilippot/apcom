import { ComponentMeta, ComponentStory } from '@storybook/react';
import CloseIcon from './close';

export default {
  title: 'Atoms/Icons',
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

export const Close = Template.bind({});
