import { ComponentMeta, ComponentStory } from '@storybook/react';
import MetaComponent, { MetaData } from './meta';

/**
 * Meta - Storybook Meta
 */
export default {
  title: 'Molecules/Layout',
  component: MetaComponent,
  argTypes: {
    data: {
      description: 'The page metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    itemsLayout: {
      control: {
        type: 'select',
      },
      description: 'The items layout.',
      options: ['inline', 'inline-values', 'stacked'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'inline-values' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    withSeparator: {
      control: {
        type: 'boolean',
      },
      description: 'Add a slash as separator between multiple values.',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MetaComponent>;

const Template: ComponentStory<typeof MetaComponent> = (args) => (
  <MetaComponent {...args} />
);

const data: MetaData = {
  publication: { date: '2022-04-09', time: '01:04:00' },
  thematics: [
    <a key="category1" href="#">
      Category 1
    </a>,
    <a key="category2" href="#">
      Category 2
    </a>,
  ],
};

/**
 * Layout Stories - Meta
 */
export const Meta = Template.bind({});
Meta.args = {
  data,
};
