import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Footer as FooterComponent } from './footer';

/**
 * Footer - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: FooterComponent,
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
} as ComponentMeta<typeof FooterComponent>;

const Template: ComponentStory<typeof FooterComponent> = (args) => (
  <FooterComponent {...args} />
);

/**
 * Layout Stories - Footer
 */
export const Footer = Template.bind({});
Footer.args = {
  children: 'The footer content.',
};
