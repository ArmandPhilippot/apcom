import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';

const meta = {
  component: Icon,
  title: 'Atoms/Images/Icons',
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ArrowRight: Story = {
  args: {
    orientation: 'right',
    shape: 'arrow',
  },
};

export const ArrowLeft: Story = {
  args: {
    orientation: 'left',
    shape: 'arrow',
  },
};

export const ArrowBottom: Story = {
  args: {
    orientation: 'bottom',
    shape: 'arrow',
  },
};

export const ArrowTop: Story = {
  args: {
    orientation: 'top',
    shape: 'arrow',
  },
};

export const Career: Story = {
  args: {
    shape: 'career',
  },
};

export const CCBySA: Story = {
  args: {
    shape: 'cc-by-sa',
  },
};

export const Cog: Story = {
  args: {
    shape: 'cog',
  },
};

export const Computer: Story = {
  args: {
    shape: 'computer',
  },
};

export const Cross: Story = {
  args: {
    shape: 'cross',
  },
};

export const Envelop: Story = {
  args: {
    shape: 'envelop',
  },
};

export const Feed: Story = {
  args: {
    shape: 'feed',
  },
};

export const Hamburger: Story = {
  args: {
    shape: 'hamburger',
  },
};

export const Help: Story = {
  args: {
    shape: 'help',
  },
};

export const Home: Story = {
  args: {
    shape: 'home',
  },
};

export const MagnifyingGlass: Story = {
  args: {
    shape: 'magnifying-glass',
  },
};

export const Minus: Story = {
  args: {
    shape: 'minus',
  },
};

export const Moon: Story = {
  args: {
    shape: 'moon',
  },
};

export const Plus: Story = {
  args: {
    shape: 'plus',
  },
};

export const PostsStack: Story = {
  args: {
    shape: 'posts-stack',
  },
};

export const Sun: Story = {
  args: {
    shape: 'sun',
  },
};
