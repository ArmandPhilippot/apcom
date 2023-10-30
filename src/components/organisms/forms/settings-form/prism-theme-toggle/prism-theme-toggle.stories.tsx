import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PrismThemeToggle } from './prism-theme-toggle';

/**
 * PrismThemeToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Settings/Items',
  component: PrismThemeToggle,
  argTypes: {},
} as ComponentMeta<typeof PrismThemeToggle>;

const Template: ComponentStory<typeof PrismThemeToggle> = (args) => (
  <PrismThemeToggle {...args} />
);

/**
 * Toggle Stories - Prism theme
 */
export const PrismTheme = Template.bind({});
