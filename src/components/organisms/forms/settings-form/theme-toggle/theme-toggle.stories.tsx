import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeToggle } from './theme-toggle';

/**
 * ThemeToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Settings/Items',
  component: ThemeToggle,
  argTypes: {},
} as ComponentMeta<typeof ThemeToggle>;

const Template: ComponentStory<typeof ThemeToggle> = (args) => (
  <ThemeToggle {...args} />
);

/**
 * Toggle Stories - Theme
 */
export const Theme = Template.bind({});
