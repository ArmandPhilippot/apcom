import { ComponentMeta, ComponentStory } from '@storybook/react';
import HeadingComponent from './heading';

export default {
  title: 'Atoms/Headings',
  component: HeadingComponent,
  argTypes: {
    children: {
      description: 'Heading body.',
      type: {
        name: 'string',
        required: true,
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
