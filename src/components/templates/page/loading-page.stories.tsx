import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LoadingPage } from './loading-page';

/**
 * LoadingPage - Storybook Meta
 */
export default {
  title: 'Templates/LoadingPage',
  component: LoadingPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoadingPage>;

const Template: ComponentStory<typeof LoadingPage> = (args) => (
  <LoadingPage {...args} />
);

/**
 * LoadingPage Stories - Example
 */
export const Example = Template.bind({});
