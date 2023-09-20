import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Main as MainComponent } from './main';

/**
 * Main - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: MainComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the main element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    id: {
      control: {
        type: 'text',
      },
      description: 'The main element id.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MainComponent>;

const Template: ComponentStory<typeof MainComponent> = (args) => (
  <MainComponent {...args} />
);

/**
 * Layout Stories - Main
 */
export const Main = Template.bind({});
Main.args = {
  children: 'The main content.',
  id: '#main',
};
