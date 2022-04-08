import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import HelpButtonComponent from './help-button';

export default {
  title: 'Molecules/Buttons',
  component: HelpButtonComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button wrapper.',
      table: {
        category: 'Options',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    onClick: {
      control: {
        type: null,
      },
      description: 'A callback function to handle click on button.',
      table: {
        category: 'Events',
      },
      type: {
        name: 'function',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof HelpButtonComponent>;

const Template: ComponentStory<typeof HelpButtonComponent> = (args) => (
  <IntlProvider locale="en">
    <HelpButtonComponent {...args} />
  </IntlProvider>
);

export const HelpButton = Template.bind({});
