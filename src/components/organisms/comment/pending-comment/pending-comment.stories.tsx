import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PendingComment } from './pending-comment';

/**
 * PendingComment - Storybook Meta
 */
export default {
  title: 'Organisms/Comment/PendingComment',
  component: PendingComment,
  argTypes: {},
} as ComponentMeta<typeof PendingComment>;

const Template: ComponentStory<typeof PendingComment> = (args) => (
  <PendingComment {...args} />
);

/**
 * PendingComment Stories - Default
 */
export const Default = Template.bind({});
Default.args = {};
