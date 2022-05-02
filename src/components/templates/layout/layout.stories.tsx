import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import LayoutComponent from './layout';

/**
 * Layout - Storybook Meta
 */
export default {
  title: 'Templates/LayoutBase',
  component: LayoutComponent,
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
      <IntlProvider locale="en">
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
      </IntlProvider>
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
