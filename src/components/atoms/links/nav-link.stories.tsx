import { ComponentMeta, ComponentStory } from '@storybook/react';
import NavLinkComponent from './nav-link';

export default {
  title: 'Atoms/Links',
  component: NavLinkComponent,
  argTypes: {
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
    label: {
      control: {
        type: 'text',
      },
      description: 'The link label.',
      type: {
        name: 'string',
        required: true,
      },
    },
    logo: {
      control: {
        type: null,
      },
      description: 'The link logo.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof NavLinkComponent>;

const Template: ComponentStory<typeof NavLinkComponent> = (args) => (
  <NavLinkComponent {...args} />
);

export const NavLink = Template.bind({});
NavLink.args = {
  href: '#',
  label: 'A nav link',
};
