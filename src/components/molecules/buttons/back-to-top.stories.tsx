import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import BackToTopComponent from './back-to-top';

export default {
  title: 'Molecules/Buttons',
  component: BackToTopComponent,
  argTypes: {
    additionalClasses: {
      control: {
        type: 'text',
      },
      description: 'Add additional classes to the button wrapper.',
      type: {
        name: 'string',
        required: false,
      },
    },
    target: {
      control: {
        type: 'text',
      },
      description: 'An element id (without hashtag) to use as anchor.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof BackToTopComponent>;

const Template: ComponentStory<typeof BackToTopComponent> = (args) => (
  <IntlProvider locale="en">
    <BackToTopComponent {...args} />
  </IntlProvider>
);

export const BackToTop = Template.bind({});
BackToTop.args = {
  target: 'top',
};
