import { ComponentMeta, ComponentStory } from '@storybook/react';
import EnvelopIcon from './envelop';

export default {
  title: 'Atoms/Icons',
  component: EnvelopIcon,
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
} as ComponentMeta<typeof EnvelopIcon>;

const Template: ComponentStory<typeof EnvelopIcon> = (args) => (
  <EnvelopIcon {...args} />
);

export const Envelop = Template.bind({});
