import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { MetaItemData } from '../../molecules';
import { Overview } from './overview';

/**
 * Overview - Storybook Meta
 */
export default {
  title: 'Organisms/Layout/Overview',
  component: Overview,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the overview wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    cover: {
      description: 'The overview cover',
      table: {
        category: 'Options',
      },
      type: {
        name: 'object',
        required: false,
        value: {},
      },
    },
    meta: {
      description: 'The overview meta.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof Overview>;

const Template: ComponentStory<typeof Overview> = (args) => (
  <Overview {...args} />
);

const cover = {
  alt: 'picture',
  height: 480,
  src: 'https://picsum.photos/640/480',
  width: 640,
};

const meta = [
  { id: 'creation-date', label: 'Creation date', value: '2022-05-09' },
  { id: 'license', label: 'License', value: 'Dignissimos ratione veritatis' },
] satisfies MetaItemData[];

/**
 * Overview Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  meta,
};

/**
 * Overview Stories - With cover
 */
export const WithCover = Template.bind({});
WithCover.args = {
  cover,
  meta,
};
