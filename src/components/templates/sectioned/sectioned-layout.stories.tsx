import { ComponentMeta, ComponentStory } from '@storybook/react';
import { LayoutBase } from '../layout/layout.stories';
import { SectionedLayout as SectionedLayoutComponent } from './sectioned-layout';

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

const sections = [
  {
    title: 'Section 1',
    content:
      'Qui suscipit ea et aut dicta. Quia ut dignissimos. Sapiente beatae voluptatem quis et. Nemo vitae magni. Nihil iste officia est sed esse molestiae doloribus. Quia temporibus nobis ea fuga quis incidunt doloribus eaque.',
  },
  {
    title: 'Section 2',
    content:
      'Reprehenderit aut magnam ut quos. Voluptatibus beatae et. Earum non atque voluptatum illum rem distinctio repellat.',
  },
  {
    title: 'Section 3',
    content:
      'Placeat rem dolores dolore illum earum officia dolore. Ut est ducimus. Officia eveniet pariatur ut laboriosam voluptatibus aut doloremque natus quis.',
  },
  {
    title: 'Section 4',
    content:
      'Vitae facere ipsa eum sunt debitis veritatis dolorem labore qui. Dolores recusandae omnis aut. Repudiandae quia neque porro in blanditiis. A atque minima fugit. Totam quidem voluptas natus velit at.',
  },
];

/**
 * Sectioned Layout Stories - Default
 */
export const Sectioned = Template.bind({});
Sectioned.args = {
  sections,
};
