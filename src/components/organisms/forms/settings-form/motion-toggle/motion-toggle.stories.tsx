import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { MotionToggle } from './motion-toggle';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Settings/Items',
  component: MotionToggle,
  argTypes: {},
} as ComponentMeta<typeof MotionToggle>;

const Template: ComponentStory<typeof MotionToggle> = (args) => (
  <MotionToggle {...args} />
);

/**
 * Toggle Stories - Motion
 */
export const Motion = Template.bind({});
Motion.args = {};
