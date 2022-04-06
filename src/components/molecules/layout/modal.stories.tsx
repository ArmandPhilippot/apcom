import Cog from '@components/atoms/icons/cog';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ModalComponent from './modal';

export default {
  title: 'Molecules/Layout',
  component: ModalComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The modal body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    icon: {
      control: {
        type: 'select',
      },
      description: 'The title icon.',
      options: ['', 'cogs', 'search'],
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The modal title.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ModalComponent>;

const Template: ComponentStory<typeof ModalComponent> = (args) => (
  <ModalComponent {...args} />
);

export const Modal = Template.bind({});
Modal.args = {
  children:
    'Inventore natus dignissimos aut illum modi asperiores. Et voluptatibus delectus.',
};
