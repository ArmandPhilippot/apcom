import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import Widget from './widget';

/**
 * Widget - Storybook Meta
 */
export default {
  title: 'Molecules/Layout/Widget',
  component: Widget,
  args: {
    withBorders: false,
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The widget body',
      type: {
        name: 'string',
        required: true,
      },
    },
    expanded: {
      control: {
        type: 'boolean',
      },
      description: 'The widget state (expanded or collapsed)',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'The heading level.',
      type: {
        name: 'number',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The widget title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    withBorders: {
      control: {
        type: 'boolean',
      },
      description: 'Define if the content should have borders.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof Widget>;

const Template: ComponentStory<typeof Widget> = (args) => <Widget {...args} />;

/**
 * Widget Stories - Expanded
 */
export const Expanded = Template.bind({});
Expanded.args = {
  children: 'Widget body',
  expanded: true,
  level: 2,
  title: 'Widget title',
};

/**
 * Widget Stories - Collapsed
 */
export const Collapsed = Template.bind({});
Collapsed.args = {
  children: 'Widget body',
  expanded: false,
  level: 2,
  title: 'Widget title',
};
