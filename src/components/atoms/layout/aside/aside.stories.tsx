import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Aside as AsideComponent } from './aside';

/**
 * Aside - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: AsideComponent,
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
} as ComponentMeta<typeof AsideComponent>;

const Template: ComponentStory<typeof AsideComponent> = (args) => (
  <AsideComponent {...args} />
);

/**
 * Layout Stories - Aside
 */
export const Aside = Template.bind({});
Aside.args = {
  children: 'The aside content.',
};
