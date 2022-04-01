import { ComponentMeta, ComponentStory } from '@storybook/react';
import ButtonLinkComponent from './button-link';

export default {
  title: 'Atoms/Buttons',
  component: ButtonLinkComponent,
  argTypes: {
    'aria-label': {
      control: {
        type: 'text',
      },
      description: 'An accessible label.',
      table: {
        category: 'Accessibility',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
    kind: {
      control: {
        type: 'select',
      },
      description: 'The link kind.',
      options: ['primary', 'secondary'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'secondary' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    shape: {
      control: {
        type: 'select',
      },
      description: 'The link shape.',
      options: ['rectangle', 'square'],
      table: {
        category: 'Options',
        defaultValue: { summary: 'rectangle' },
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    target: {
      control: {
        type: null,
      },
      description: 'The link target.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ButtonLinkComponent>;

const Template: ComponentStory<typeof ButtonLinkComponent> = (args) => (
  <ButtonLinkComponent {...args} />
);

export const ButtonLink = Template.bind({});
ButtonLink.args = {
  children: 'Link',
  target: '#',
};
