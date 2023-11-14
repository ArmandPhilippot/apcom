import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../../atoms';
import { TocWidget } from './toc-widget';

/**
 * TocWidget - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets/Table of Contents',
  component: TocWidget,
  argTypes: {
    tree: {
      description: 'The headings tree.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
} as ComponentMeta<typeof TocWidget>;

const Template: ComponentStory<typeof TocWidget> = (args) => (
  <TocWidget {...args} />
);

/**
 * Widgets Stories - Table of Contents
 */
export const TableOfContents = Template.bind({});
TableOfContents.args = {
  heading: <Heading level={3}>Table of contents</Heading>,
  tree: [
    { children: [], depth: 2, id: 'title1', label: 'Title 1' },
    {
      children: [
        { children: [], depth: 3, id: 'subtitle1', label: 'Subtitle 1' },
        { children: [], depth: 3, id: 'subtitle2', label: 'Subtitle 2' },
      ],
      depth: 2,
      id: 'title2',
      label: 'Title 2',
    },
    { children: [], depth: 2, id: 'title3', label: 'Title 3' },
  ],
};
