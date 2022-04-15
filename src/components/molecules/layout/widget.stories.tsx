import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import WidgetComponent from './widget';

export default {
  title: 'Molecules/Layout',
  component: WidgetComponent,
  args: {
    expanded: true,
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
} as ComponentMeta<typeof WidgetComponent>;

const Template: ComponentStory<typeof WidgetComponent> = (args) => (
  <IntlProvider locale="en">
    <WidgetComponent {...args} />
  </IntlProvider>
);

export const Widget = Template.bind({});
Widget.args = {
  children: 'Widget body',
  level: 2,
  title: 'Widget title',
};
