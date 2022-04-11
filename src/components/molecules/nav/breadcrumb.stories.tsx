import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import BreadcrumbComponent, { type BreadcrumbItem } from './breadcrumb';

export default {
  title: 'Molecules/Nav',
  component: BreadcrumbComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Styles',
      },
      description: 'Set additional classnames to the nav element.',
      type: {
        name: 'string',
        required: false,
      },
    },
    items: {
      description: 'The breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof BreadcrumbComponent>;

const Template: ComponentStory<typeof BreadcrumbComponent> = (args) => (
  <IntlProvider locale="en">
    <BreadcrumbComponent {...args} />
  </IntlProvider>
);

const items: BreadcrumbItem[] = [
  { id: 'home', url: '#', name: 'Home' },
  { id: 'blog', url: '#', name: 'Blog' },
  { id: 'post1', url: '#', name: 'A Post' },
];

export const Breadcrumb = Template.bind({});
Breadcrumb.args = {
  items,
};
