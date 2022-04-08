import { ComponentMeta, ComponentStory } from '@storybook/react';
import LogoComponent from './logo';

export default {
  title: 'Atoms/Images',
  component: LogoComponent,
  argTypes: {
    title: {
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

export const Logo = Template.bind({});
