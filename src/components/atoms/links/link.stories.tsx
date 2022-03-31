import { ComponentMeta, ComponentStory } from '@storybook/react';
import LinkComponent from './link';

export default {
  title: 'Atoms/Links',
  component: LinkComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The link body.',
      type: {
        name: 'string',
        required: true,
      },
    },
    external: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Options',
      },
      description: 'Determine if the link is external of the current website.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    href: {
      control: {
        type: 'text',
      },
      description: 'The link target.',
      type: {
        name: 'string',
        required: true,
      },
    },
    lang: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Options',
      },
      description: 'The target language as code language.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof LinkComponent>;

const Template: ComponentStory<typeof LinkComponent> = (args) => (
  <LinkComponent {...args} />
);

export const Link = Template.bind({});
Link.args = {
  children: 'A link',
  href: '#',
  external: false,
};
