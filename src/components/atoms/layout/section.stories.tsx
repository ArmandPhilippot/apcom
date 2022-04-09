import { ComponentMeta, ComponentStory } from '@storybook/react';
import SectionComponent from './section';

export default {
  title: 'Atoms/Layout',
  component: SectionComponent,
  args: {
    variant: 'dark',
    withBorder: true,
  },
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the section element.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'The section content.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The section title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      description: 'The section variant.',
      options: ['light', 'dark'],
      table: {
        category: 'Styles',
        defaultValue: { summary: 'dark' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    withBorder: {
      control: {
        type: 'boolean',
      },
      description: 'Add a border at the bottom of the section.',
      table: {
        category: 'Styles',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof SectionComponent>;

const Template: ComponentStory<typeof SectionComponent> = (args) => (
  <SectionComponent {...args} />
);

export const Section = Template.bind({});
Section.args = {
  title: 'A title',
  content: 'The content.',
};
