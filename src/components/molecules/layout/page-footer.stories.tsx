import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageFooterComponent from './page-footer';

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

const meta = {
  topics: { name: 'More posts about:', value: <a href="#">Topic name</a> },
};

/**
 * Page Footer Stories - With meta
 */
export const PageFooter = Template.bind({});
PageFooter.args = {
  meta,
};
