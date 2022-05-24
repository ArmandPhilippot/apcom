import { ComponentMeta, ComponentStory } from '@storybook/react';
import SocialLink from './social-link';

/**
 * SocialLink - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/Social',
  component: SocialLink,
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      description: 'Social website name.',
      options: ['Github', 'Gitlab', 'LinkedIn', 'Twitter'],
      type: {
        name: 'string',
        required: true,
      },
    },
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
  name: 'Github',
  url: '#',
};

/**
 * Social Link Stories - Gitlab
 */
export const Gitlab = Template.bind({});
Gitlab.args = {
  name: 'Gitlab',
  url: '#',
};

/**
 * Social Link Stories - LinkedIn
 */
export const LinkedIn = Template.bind({});
LinkedIn.args = {
  name: 'LinkedIn',
  url: '#',
};

/**
 * Social Link Stories - Twitter
 */
export const Twitter = Template.bind({});
Twitter.args = {
  name: 'Twitter',
  url: '#',
};
