import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactForm } from './contact-form';

/**
 * ContactForm - Storybook Meta
 */
export default {
  title: 'Organisms/Forms',
  component: ContactForm,
  argTypes: {
    onSubmit: {
      control: {
        type: null,
      },
      description: 'A callback function to process the contact form data.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof ContactForm>;

const Template: ComponentStory<typeof ContactForm> = (args) => (
  <ContactForm {...args} />
);

/**
 * ContactForm Stories - Contact
 */
export const Contact = Template.bind({});
Contact.args = {};
