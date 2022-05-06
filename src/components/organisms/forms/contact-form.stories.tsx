import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ContactForm from './contact-form';

/**
 * ContactForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: ContactForm,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the form wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    Notice: {
      control: {
        type: null,
      },
      description: 'A component to display a success or error message.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
    sendMail: {
      control: {
        type: null,
      },
      description: 'A callback function to process the contact form data.',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof ContactForm>;

const Template: ComponentStory<typeof ContactForm> = (args) => (
  <ContactForm {...args} />
);

/**
 * Forms Stories - Contact
 */
export const Contact = Template.bind({});
Contact.args = {
  sendMail: async (_data, reset: () => void) => {
    reset();
  },
};
