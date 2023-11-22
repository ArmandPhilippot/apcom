import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Heading } from '../../heading';
import { Section as SectionComponent } from './section';

/**
 * Section - Storybook Meta
 */
export default {
  title: 'Atoms/Layout/Section',
  component: SectionComponent,
  argTypes: {
    children: {
      description: 'The section contents.',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SectionComponent>;

const Template: ComponentStory<typeof SectionComponent> = (args) => (
  <SectionComponent {...args} />
);

/**
 * Section Story
 */
export const Section = Template.bind({});
Section.args = {
  children: (
    <>
      <Heading level={2}>A section title</Heading>
      <div>The body</div>
    </>
  ),
};
