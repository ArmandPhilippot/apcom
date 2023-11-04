import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentForm as CommentFormComponent } from './comment-form';

/**
 * CommentForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: CommentFormComponent,
  argTypes: {
    parentId: {
      control: {
        type: null,
      },
      description: 'The parent id if it is a reply.',
      type: {
        name: 'number',
        required: false,
      },
    },
    onSubmit: {
      control: {
        type: null,
      },
      description: 'A callback function to process the comment form data.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof CommentFormComponent>;

const Template: ComponentStory<typeof CommentFormComponent> = (args) => (
  <CommentFormComponent {...args} />
);

/**
 * Forms Stories - Comment form
 */
export const CommentForm = Template.bind({});
