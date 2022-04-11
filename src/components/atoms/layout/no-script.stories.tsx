import { ComponentMeta, ComponentStory } from '@storybook/react';
import NoScriptComponent from './no-script';

export default {
  title: 'Atoms/Layout',
  component: NoScriptComponent,
  args: {
    position: 'initial',
  },
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
      description: 'A message to display when Javascript is disabled.',
      type: {
        name: 'string',
        required: true,
      },
    },
    position: {
      control: {
        type: 'select',
      },
      description: 'The message position.',
      options: ['initial', 'top'],
      table: {
        category: 'Options',
        defaultValue: 'initial',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof NoScriptComponent>;

const Template: ComponentStory<typeof NoScriptComponent> = (args) => (
  <NoScriptComponent {...args} />
);

export const NoScript = Template.bind({});
NoScript.args = {
  message: 'A noscript only message.',
};
