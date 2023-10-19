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
 * NavLink Stories - Regular
 */
export const Regular = Template.bind({});
Regular.args = {
  href: '#',
  label: 'A nav link',
};

/**
 * NavLink Stories - RegularInlineWithLogo
 */
export const RegularInlineWithLogo = Template.bind({});
RegularInlineWithLogo.args = {
  href: '#example',
  isStack: false,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
};

/**
 * NavLink Stories - RegularStackWithLogo
 */
export const RegularStackWithLogo = Template.bind({});
RegularStackWithLogo.args = {
  href: '#example',
  isStack: true,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
};

/**
 * NavLink Stories - Block
 */
export const Block = Template.bind({});
Block.args = {
  href: '#',
  label: 'A nav link',
  variant: 'block',
};

/**
 * NavLink Stories - BlockInlineWithLogo
 */
export const BlockInlineWithLogo = Template.bind({});
BlockInlineWithLogo.args = {
  href: '#example',
  isStack: false,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
  variant: 'block',
};

/**
 * NavLink Stories - BlockStackWithLogo
 */
export const BlockStackWithLogo = Template.bind({});
BlockStackWithLogo.args = {
  href: '#example',
  isStack: true,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
  variant: 'block',
};

/**
 * NavLink Stories - Main
 */
export const Main = Template.bind({});
Main.args = {
  href: '#',
  label: 'A nav link',
  variant: 'main',
};

/**
 * NavLink Stories - MainInlineWithLogo
 */
export const MainInlineWithLogo = Template.bind({});
MainInlineWithLogo.args = {
  href: '#example',
  isStack: false,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
  variant: 'main',
};

/**
 * NavLink Stories - MainStackWithLogo
 */
export const MainStackWithLogo = Template.bind({});
MainStackWithLogo.args = {
  href: '#example',
  isStack: true,
  label: 'A nav link',
  logo: <Icon aria-hidden shape="home" />,
  variant: 'main',
};
