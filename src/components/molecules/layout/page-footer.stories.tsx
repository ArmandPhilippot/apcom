import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageFooter as PageFooterComponent } from './page-footer';

/**
 * Page Footer - Storybook Meta
 */
export default {
  title: 'Molecules/Layout',
  component: PageFooterComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the footer element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    meta: {
      description: 'The page meta.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof PageFooterComponent>;

const Template: ComponentStory<typeof PageFooterComponent> = (args) => (
  <PageFooterComponent {...args} />
);

const meta = [
  {
    id: 'more-about',
    label: 'More posts about:',
    value: (
      <a key="topic-1" href="#topic1">
        Topic name
      </a>
    ),
  },
];

/**
 * Page Footer Stories - With meta
 */
export const PageFooter = Template.bind({});
PageFooter.args = {
  meta,
};
