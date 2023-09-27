import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { LayoutBase } from '../layout/layout.stories';
import { SectionedLayout as SectionedLayoutComponent } from './sectioned-layout';
import { sections } from './sectioned-layout.fixtures';

/**
 * SectionedLayout - Storybook Meta
 */
export default {
  title: 'Templates/Sectioned',
  component: SectionedLayoutComponent,
  args: {
    breadcrumbSchema: [],
  },
  argTypes: {
    breadcrumbSchema: {
      control: {
        type: null,
      },
      description: 'The JSON schema for breadcrumb items.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    sections: {
      description: 'The different sections.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
  },
  decorators: [
    (Story) => (
      <LayoutBase {...LayoutBase.args}>
        <Story />
      </LayoutBase>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof SectionedLayoutComponent>;

const Template: ComponentStory<typeof SectionedLayoutComponent> = (args) => (
  <SectionedLayoutComponent {...args} />
);

/**
 * Sectioned Layout Stories - Default
 */
export const Sectioned = Template.bind({});
Sectioned.args = {
  sections,
};
