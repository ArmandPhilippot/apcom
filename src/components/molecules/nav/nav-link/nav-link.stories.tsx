import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../../../atoms';
import { NavLink as NavLinkComponent } from './nav-link';

/**
 * NavLink - Storybook Meta
 */
export default {
  title: 'Molecules/Nav/NavLink',
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
  <div style={{ width: 'fit-content' }}>
    <NavLinkComponent {...args} />
  </div>
);

/**
 * NavLink Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  href: '#',
  label: 'A nav link',
};

/**
 * NavLink Stories - StackWithLogo
 */
export const StackWithLogo = Template.bind({});
StackWithLogo.args = {
  href: '#example',
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
};

/**
 * NavLink Stories - InlineWithLogo
 */
export const InlineWithLogo = Template.bind({});
InlineWithLogo.args = {
  href: '#example',
  isInline: true,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
};
