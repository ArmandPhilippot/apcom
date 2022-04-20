import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SharingLinkComponent from './sharing-link';

/**
 * SharingLink - Storybook Meta
 */
export default {
  title: 'Atoms/Buttons/Sharing',
  component: SharingLinkComponent,
  argTypes: {
    medium: {
      control: {
        type: 'select',
      },
      description: 'The sharing medium.',
      options: [
        'diaspora',
        'email',
        'facebook',
        'journal-du-hacker',
        'linkedin',
        'twitter',
      ],
      type: {
        name: 'string',
        required: true,
      },
    },
    url: {
      control: {
        type: 'text',
      },
      description: 'The sharing url.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof SharingLinkComponent>;

const Template: ComponentStory<typeof SharingLinkComponent> = (args) => (
  <IntlProvider locale="en">
    <SharingLinkComponent {...args} />
  </IntlProvider>
);

/**
 * Sharing Link Stories - Diaspora
 */
export const Diaspora = Template.bind({});
Diaspora.args = {
  medium: 'diaspora',
  url: '#',
};

/**
 * Sharing Link Stories - Email
 */
export const Email = Template.bind({});
Email.args = {
  medium: 'email',
  url: '#',
};

/**
 * Sharing Link Stories - Facebook
 */
export const Facebook = Template.bind({});
Facebook.args = {
  medium: 'facebook',
  url: '#',
};

/**
 * Sharing Link Stories - Journal du Hacker
 */
export const JournalDuHacker = Template.bind({});
JournalDuHacker.args = {
  medium: 'journal-du-hacker',
  url: '#',
};

/**
 * Sharing Link Stories - LinkedIn
 */
export const LinkedIn = Template.bind({});
LinkedIn.args = {
  medium: 'linkedin',
  url: '#',
};

/**
 * Sharing Link Stories - Twitter
 */
export const Twitter = Template.bind({});
Twitter.args = {
  medium: 'twitter',
  url: '#',
};
