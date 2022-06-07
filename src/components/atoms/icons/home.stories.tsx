import { ComponentMeta, ComponentStory } from '@storybook/react';
import HomeIcon from './home';

/**
 * Home icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: HomeIcon,
  argTypes: {
    'aria-hidden': {
      control: {
        type: null,
      },
      description: 'Should the svg be hidden from assistive technologies?',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
} as ComponentMeta<typeof HomeIcon>;

const Template: ComponentStory<typeof HomeIcon> = (args) => (
  <HomeIcon {...args} />
);

/**
 * Icons Stories - Home
 */
export const Home = Template.bind({});
