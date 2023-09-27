import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header as HeaderComponent } from './header';

/**
 * Header - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: HeaderComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The contents.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <HeaderComponent {...args} />
);

/**
 * Layout Stories - Header
 */
export const Header = Template.bind({});
Header.args = {
  children: 'The header content.',
};
