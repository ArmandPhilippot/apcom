import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HelpButton as HelpButtonComponent } from './help-button';

/**
 * HelpButton - Storybook Meta
 */
export default {
  title: 'Molecules/Buttons',
  component: HelpButtonComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button wrapper.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    onClick: {
      control: {
        type: null,
      },
      description: 'A callback function to handle click on button.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof HelpButtonComponent>;

const Template: ComponentStory<typeof HelpButtonComponent> = (args) => (
  <HelpButtonComponent {...args} />
);

/**
 * Help Button Stories - Level 1
 */
export const HelpButton = Template.bind({});
