import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Link } from '../../atoms';
import { MetaItem, MetaList } from '../meta-list';
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

/**
 * Page Footer Stories - With meta
 */
export const PageFooter = Template.bind({});
PageFooter.args = {
  children: (
    <MetaList>
      <MetaItem
        label="More posts about:"
        value={<Link href="#topic1">Topic name</Link>}
      />
    </MetaList>
  ),
};
