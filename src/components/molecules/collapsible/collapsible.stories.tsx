import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../atoms';
import { Collapsible } from './collapsible';

/**
 * HeadingButton - Storybook Meta
 */
export default {
  title: 'Molecules/Collapsible',
  component: Collapsible,
  argTypes: {
    heading: {
      control: {
        type: 'text',
      },
      description: 'Define the collapsible heading.',
      type: {
        name: 'function',
        required: true,
      },
    },
    isCollapsed: {
      control: {
        type: 'boolean',
      },
      description: 'Define if the component should be collapsed or expanded.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Collapsible>;

const Template: ComponentStory<typeof Collapsible> = ({ heading, ...args }) => (
  <Collapsible
    {...args}
    heading={
      <Heading isFake level={3}>
        {heading}
      </Heading>
    }
  />
);

const heading = 'Your title';
const body =
  'Eius et eum ex voluptas laboriosam aliquid quas necessitatibus. Molestiae eius voluptatem qui voluptas eaque et totam. Ut ipsum ea sit. Quos molestiae id est consequatur. Suscipit illo at. Omnis non suscipit. Qui itaque laboriosam quos ut est laudantium. Iusto recusandae excepturi quia labore voluptatem quod recusandae. Quod ducimus ut rem dolore et.';

/**
 * Collapsible Stories - Collapsed
 */
export const Collapsed = Template.bind({});
Collapsed.args = {
  children: body,
  heading,
  isCollapsed: true,
};

/**
 * Collapsible Stories - Expanded
 */
export const Expanded = Template.bind({});
Expanded.args = {
  children: body,
  heading,
  isCollapsed: false,
};
