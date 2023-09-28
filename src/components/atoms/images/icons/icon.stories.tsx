import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon, type IconProps, type IconShape } from './icon';

/**
 * Home icon - Storybook Meta
 */
export default {
  title: 'Atoms/Images/Icons',
  component: Icon,
  argTypes: {
    shape: {
      control: {
        type: 'select',
      },
      options: [
        'arrow',
        'career',
        'cc-by-sa',
        'cog',
        'computer',
        'cross',
        'envelop',
        'feed',
        'hamburger',
        'home',
        'magnifying-glass',
        'minus',
        'moon',
        'posts-stack',
        'plus',
        'sun',
      ],
      description: 'Define the icon shape.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = ({
  shape,
  ...args
}: IconProps<IconShape>) => <Icon {...args} shape={shape} />;

/**
 * Icon Stories - ArrowRight
 */
export const ArrowRight = Template.bind({});
ArrowRight.args = {
  orientation: 'right',
  shape: 'arrow',
};

/**
 * Icon Stories - ArrowLeft
 */
export const ArrowLeft = Template.bind({});
ArrowLeft.args = {
  orientation: 'left',
  shape: 'arrow',
};

/**
 * Icon Stories - ArrowBottom
 */
export const ArrowBottom = Template.bind({});
ArrowBottom.args = {
  orientation: 'bottom',
  shape: 'arrow',
};

/**
 * Icon Stories - ArrowTop
 */
export const ArrowTop = Template.bind({});
ArrowTop.args = {
  orientation: 'top',
  shape: 'arrow',
};

/**
 * Icon Stories - Career
 */
export const Career = Template.bind({});
Career.args = {
  shape: 'career',
};

/**
 * Icon Stories - CCBySA
 */
export const CCBySA = Template.bind({});
CCBySA.args = {
  shape: 'cc-by-sa',
};

/**
 * Icon Stories - Cog
 */
export const Cog = Template.bind({});
Cog.args = {
  shape: 'cog',
};

/**
 * Icon Stories - Computer
 */
export const Computer = Template.bind({});
Computer.args = {
  shape: 'computer',
};

/**
 * Icon Stories - Cross
 */
export const Cross = Template.bind({});
Cross.args = {
  shape: 'cross',
};

/**
 * Icon Stories - Envelop
 */
export const Envelop = Template.bind({});
Envelop.args = {
  shape: 'envelop',
};

/**
 * Icon Stories - Feed
 */
export const Feed = Template.bind({});
Feed.args = {
  shape: 'feed',
};

/**
 * Icon Stories - Hamburger
 */
export const Hamburger = Template.bind({});
Hamburger.args = {
  shape: 'hamburger',
};

/**
 * Icon Stories - Home
 */
export const Home = Template.bind({});
Home.args = {
  shape: 'home',
};

/**
 * Icon Stories - MagnifyingGlass
 */
export const MagnifyingGlass = Template.bind({});
MagnifyingGlass.args = {
  shape: 'magnifying-glass',
};

/**
 * Icon Stories - Minus
 */
export const Minus = Template.bind({});
Minus.args = {
  shape: 'minus',
};

/**
 * Icon Stories - Moon
 */
export const Moon = Template.bind({});
Moon.args = {
  shape: 'moon',
};

/**
 * Icon Stories - Plus
 */
export const Plus = Template.bind({});
Plus.args = {
  shape: 'plus',
};

/**
 * Icon Stories - PostsStack
 */
export const PostsStack = Template.bind({});
PostsStack.args = {
  shape: 'posts-stack',
};

/**
 * Icon Stories - Sun
 */
export const Sun = Template.bind({});
Sun.args = {
  shape: 'sun',
};
