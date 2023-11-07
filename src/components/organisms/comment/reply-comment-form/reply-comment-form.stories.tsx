import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../../atoms';
import { ReplyCommentForm } from './reply-comment-form';

/**
 * ReplyCommentForm - Storybook Meta
 */
export default {
  title: 'Organisms/Comment/ReplyCommentForm',
  component: ReplyCommentForm,
  argTypes: {},
} as ComponentMeta<typeof ReplyCommentForm>;

const Template: ComponentStory<typeof ReplyCommentForm> = (args) => (
  <ReplyCommentForm {...args} />
);

/**
 * ReplyCommentForm Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  commentId: 5,
  heading: <Heading level={2}>Reply to comment 5</Heading>,
};
