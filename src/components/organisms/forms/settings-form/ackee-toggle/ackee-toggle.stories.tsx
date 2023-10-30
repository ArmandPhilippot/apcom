import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { AckeeToggle } from './ackee-toggle';

/**
 * AckeeToggle - Storybook Meta
 */
export default {
  title: 'Organisms/Forms/Settings/Items',
  component: AckeeToggle,
  argTypes: {},
} as ComponentMeta<typeof AckeeToggle>;

const Template: ComponentStory<typeof AckeeToggle> = (args) => (
  <AckeeToggle {...args} />
);

/**
 * Toggle Stories - Ackee
 */
export const Ackee = Template.bind({});
Ackee.args = {};
