import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoadingPageComments } from './loading-page-comments';

/**
 * LoadingPageComments - Storybook Meta
 */
export default {
  title: 'Templates/LoadingPageComments',
  component: LoadingPageComments,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoadingPageComments>;

const Template: ComponentStory<typeof LoadingPageComments> = (args) => (
  <LoadingPageComments {...args} />
);

/**
 * LoadingPageComments Stories - Example
 */
export const Example = Template.bind({});
