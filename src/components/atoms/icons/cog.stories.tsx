import { ComponentMeta, ComponentStory } from '@storybook/react';
import CogIcon from './cog';

export default {
  title: 'Atoms/Icons',
  component: CogIcon,
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
} as ComponentMeta<typeof CogIcon>;

const Template: ComponentStory<typeof CogIcon> = (args) => (
  <CogIcon {...args} />
);

export const Cog = Template.bind({});
