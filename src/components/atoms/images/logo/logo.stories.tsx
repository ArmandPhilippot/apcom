import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Logo as LogoComponent } from './logo';

/**
 * Logo - Storybook Meta
 */
export default {
  title: 'Atoms/Images',
  component: LogoComponent,
  argTypes: {
    heading: {
      control: {
        type: 'text',
      },
      description: 'The SVG title.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof LogoComponent>;

const Template: ComponentStory<typeof LogoComponent> = (args) => (
  <LogoComponent {...args} />
);

/**
 * Images Stories - Logo
 */
export const Logo = Template.bind({});
