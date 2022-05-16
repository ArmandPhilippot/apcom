import { ComponentMeta, ComponentStory } from '@storybook/react';
import LayoutComponent from './layout';

/**
 * Layout - Storybook Meta
 */
export default {
  title: 'Templates/LayoutBase',
  component: LayoutComponent,
  args: {
    breadcrumbSchema: [],
    isHome: false,
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The article content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    breadcrumbSchema: {
      control: {
        type: 'null',
      },
      description: 'The JSON schema for breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    isHome: {
      control: {
        type: 'boolean',
      },
      description: 'Determine if it is the homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the article element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        id="__next"
        style={{
          flex: 1,
          display: 'flex',
          flexFlow: 'column nowrap',
          minHeight: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof LayoutComponent>;

const Template: ComponentStory<typeof LayoutComponent> = (args) => (
  <LayoutComponent {...args} />
);

/**
 * Layout Stories - Default
 */
export const LayoutBase = Template.bind({});
