import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeadingComponent from './heading';

export default {
  title: 'Atoms/Headings',
  component: HeadingComponent,
  args: {
    isFake: false,
    withMargin: true,
  },
  argTypes: {
    additionalClasses: {
      control: {
        type: 'text',
      },
      description: 'Set additional classes.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    children: {
      description: 'Heading body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    isFake: {
      control: {
        type: 'boolean',
      },
      description: 'Use an heading element or only its styles.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    level: {
      control: {
        type: 'select',
      },
      description: 'Heading level.',
      options: [1, 2, 3, 4, 5, 6],
      type: {
        name: 'number',
        required: true,
      },
    },
    withMargin: {
      control: {
        type: 'boolean',
      },
      description: 'Adds margin.',
      table: {
        category: 'Options',
        defaultValue: { summary: true },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof HeadingComponent>;

const Template: ComponentStory<typeof HeadingComponent> = (args) => {
  const { level, ...props } = args;
  return <HeadingComponent level={level || 1} {...props} />;
};

export const Heading = Template.bind({});
Heading.args = {
  children: 'Your title',
};
