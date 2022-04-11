import { ComponentMeta, ComponentStory } from '@storybook/react';
import MetaComponent from './meta';

export default {
  title: 'Molecules/Layout',
  component: MetaComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the meta wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    meta: {
      control: {
        type: null,
      },
      description: 'The page metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof MetaComponent>;

const Template: ComponentStory<typeof MetaComponent> = (args) => (
  <MetaComponent {...args} />
);

const data = {
  publication: { name: 'Published on:', value: 'April 9th 2022' },
  categories: {
    name: 'Categories:',
    value: [
      <a key="category1" href="#">
        Category 1
      </a>,
      <a key="category2" href="#">
        Category 2
      </a>,
    ],
  },
};

export const Meta = Template.bind({});
Meta.args = {
  data,
};
