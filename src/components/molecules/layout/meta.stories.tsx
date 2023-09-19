import { ComponentMeta, ComponentStory } from '@storybook/react';
import descriptionListItemStories from '../../atoms/lists/description-list-item.stories';
import descriptionListStories from '../../atoms/lists/description-list.stories';
import MetaComponent, { MetaData } from './meta';

/**
 * Meta - Storybook Meta
 */
export default {
  title: 'Molecules/Layout',
  component: MetaComponent,
  args: {
    itemsLayout: 'inline-values',
    withSeparator: false,
  },
  argTypes: {
    className: descriptionListStories.argTypes?.className,
    data: {
      description: 'The page metadata.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    groupClassName: descriptionListStories.argTypes?.groupClassName,
    itemsLayout: {
      ...descriptionListItemStories.argTypes?.layout,
      table: {
        ...descriptionListItemStories.argTypes?.layout?.table,
        defaultValue: { summary: 'inline-values' },
      },
    },
    labelClassName: descriptionListStories.argTypes?.labelClassName,
    layout: descriptionListStories.argTypes?.layout,
    valueClassName: descriptionListStories.argTypes?.valueClassName,
    withSeparator: {
      ...descriptionListStories.argTypes?.withSeparator,
      table: {
        ...descriptionListStories.argTypes?.withSeparator?.table,
        defaultValue: { summary: true },
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
