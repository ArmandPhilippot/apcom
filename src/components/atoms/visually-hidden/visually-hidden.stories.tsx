import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from '../links';
import { VisuallyHidden } from './visually-hidden';

/**
 * Sidebar - Storybook Meta
 */
export default {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The contents to visually hide.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof VisuallyHidden>;

const Template: ComponentStory<typeof VisuallyHidden> = (args) => (
  <VisuallyHidden {...args} />
);

/**
 * VisuallyHidden Stories - Not focusable
 */
export const NotFocusable = Template.bind({});
NotFocusable.args = {
  children: 'Esse quia deserunt animi id sit voluptatem aperiam.',
};

/**
 * VisuallyHidden Stories - Focusable
 */
export const Focusable = Template.bind({});
Focusable.args = {
  children: (
    <>
      {'Esse quia deserunt animi id sit voluptatem aperiam. '}
      <Link href="#">Any link.</Link>
    </>
  ),
};
