import { ComponentMeta, ComponentStory } from '@storybook/react';
import SocialLinkComponent from './social-link';

export default {
  title: 'Atoms/Links',
  component: SocialLinkComponent,
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
} as ComponentMeta<typeof SocialLinkComponent>;

const Template: ComponentStory<typeof SocialLinkComponent> = (args) => (
  <SocialLinkComponent {...args} />
);

export const SocialLink = Template.bind({});
SocialLink.args = {
  name: 'Github',
  url: '#',
};
