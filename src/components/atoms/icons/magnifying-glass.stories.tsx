import { ComponentMeta, ComponentStory } from '@storybook/react';
import MagnifyingGlassIcon from './magnifying-glass';

export default {
  title: 'Atoms/Icons',
  component: MagnifyingGlassIcon,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof MagnifyingGlassIcon>;

const Template: ComponentStory<typeof MagnifyingGlassIcon> = (args) => (
  <MagnifyingGlassIcon {...args} />
);

export const MagnifyingGlass = Template.bind({});
