import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Sidebar as SidebarComponent } from './sidebar';

/**
 * Sidebar - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: SidebarComponent,
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the sidebar.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    children: {
      control: {
        type: 'text',
      },
      description: 'The sidebar content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the aside element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof SidebarComponent>;

const Template: ComponentStory<typeof SidebarComponent> = (args) => (
  <SidebarComponent {...args} />
);

/**
 * Layout Stories - Sidebar
 */
export const Sidebar = Template.bind({});
Sidebar.args = {
  children: 'Some widgets.',
};
