import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ContactFormComponent from './contact-form';

export default {
  title: 'Organisms/Forms',
  component: ContactFormComponent,
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
} as ComponentMeta<typeof ContactFormComponent>;

const Template: ComponentStory<typeof ContactFormComponent> = (args) => (
  <IntlProvider locale="en">
    <ContactFormComponent {...args} />
  </IntlProvider>
);

export const ContactForm = Template.bind({});
ContactForm.args = {
  sendMail: (reset: () => void) => {
    reset();
  },
};
