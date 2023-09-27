import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Nav as NavComponent } from './nav';

/**
 * Nav - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: NavComponent,
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
} as ComponentMeta<typeof NavComponent>;

const Template: ComponentStory<typeof NavComponent> = (args) => (
  <NavComponent {...args} />
);

/**
 * Layout Stories - Nav
 */
export const Nav = Template.bind({});
Nav.args = {
  children: 'The nav content.',
};
