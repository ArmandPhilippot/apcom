import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoticeComponent from './notice';

export default {
  title: 'Atoms/Layout',
  component: NoticeComponent,
  argTypes: {
    kind: {
      control: {
        type: 'select',
      },
      description: 'The notice kind.',
      options: ['error', 'info', 'success', 'warning'],
      type: {
        name: 'string',
        required: true,
      },
    },
    message: {
      control: {
        type: 'text',
      },
      description: 'The notice body.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof NoticeComponent>;

const Template: ComponentStory<typeof NoticeComponent> = (args) => (
  <NoticeComponent {...args} />
);

export const Notice = Template.bind({});
Notice.args = {
  kind: 'info',
  message: 'Nisi provident sapiente.',
};
