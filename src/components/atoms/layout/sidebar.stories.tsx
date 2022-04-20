import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SidebarComponent from './sidebar';

/**
 * Sidebar - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: SidebarComponent,
  argTypes: {
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
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
