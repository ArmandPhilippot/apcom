import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Meta as MetaComponent, type MetaData } from './meta';

/**
 * Meta - Storybook Meta
 */
export default {
  title: 'Molecules/Layout',
  component: MetaComponent,
  args: {},
  argTypes: {
    data: {
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

const data: MetaData = {
  publication: { date: '2022-04-09', time: '01:04:00' },
  thematics: [
    <a key="category1" href="#a">
      Category 1
    </a>,
    <a key="category2" href="#b">
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
