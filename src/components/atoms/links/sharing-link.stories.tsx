import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SharingLinkComponent from './sharing-link';

export default {
  title: 'Atoms/Links',
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

export const SharingLink = Template.bind({});
SharingLink.args = {
  medium: 'diaspora',
  url: '#',
};
