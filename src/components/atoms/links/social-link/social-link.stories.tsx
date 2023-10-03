import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { SocialLink } from './social-link';

/**
 * SocialLink - Storybook Meta
 */
export default {
  title: 'Atoms/Links/Social',
  component: SocialLink,
  argTypes: {
    url: {
      control: {
        type: null,
      },
      description: 'Social profile url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SocialLink>;

const Template: ComponentStory<typeof SocialLink> = (args) => (
  <SocialLink {...args} />
);

/**
 * Social Link Stories - Github
 */
export const Github = Template.bind({});
Github.args = {
  icon: 'Github',
  label: 'Github profile',
  url: '#',
};

/**
 * Social Link Stories - Gitlab
 */
export const Gitlab = Template.bind({});
Gitlab.args = {
  icon: 'Gitlab',
  label: 'Gitlab profile',
  url: '#',
};

/**
 * Social Link Stories - LinkedIn
 */
export const LinkedIn = Template.bind({});
LinkedIn.args = {
  icon: 'LinkedIn',
  label: 'LinkedIn profile',
  url: '#',
};

/**
 * Social Link Stories - Twitter
 */
export const Twitter = Template.bind({});
Twitter.args = {
  icon: 'Twitter',
  label: 'Twitter profile',
  url: '#',
};
