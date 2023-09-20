import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavLink as NavLinkComponent } from './nav-link';

/**
 * NavLink - Storybook Meta
 */
export default {
  title: 'Atoms/Typography/Links',
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

/**
 * Links Stories - Nav Link
 */
export const NavLink = Template.bind({});
NavLink.args = {
  href: '#',
  label: 'A nav link',
};
