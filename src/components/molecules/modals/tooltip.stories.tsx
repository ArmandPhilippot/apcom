import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Tooltip } from './tooltip';
import { content, icon, title } from './tooltip.fixture';

/**
 * Tooltip - Storybook Meta
 */
export default {
  title: 'Molecules/Modals/Tooltip',
  component: Tooltip,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the tooltip.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    cloneClassName: {
      control: {
        type: 'text',
      },
      description:
        'Set additional classnames to the tooltip when using cloneElement.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'The tooltip body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    icon: {
      control: {
        type: 'text',
      },
      description: 'The tooltip icon.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The tooltip title',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

/**
 * Tooltip Stories - Help
 */
export const Help = Template.bind({});
Help.args = {
  content,
  icon,
  title,
};
