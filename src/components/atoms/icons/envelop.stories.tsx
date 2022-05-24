import { ComponentMeta, ComponentStory } from '@storybook/react';
import EnvelopIcon from './envelop';

/**
 * Envelop icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
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

/**
 * Icons Stories - Envelop
 */
export const Envelop = Template.bind({});
