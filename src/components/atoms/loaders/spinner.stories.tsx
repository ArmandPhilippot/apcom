import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import SpinnerComponent from './spinner';

export default {
  title: 'Atoms/Loaders',
  component: SpinnerComponent,
  argTypes: {
    message: {
      control: {
        type: 'text',
      },
      description: 'Loading message.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof SpinnerComponent>;

const Template: ComponentStory<typeof SpinnerComponent> = (args) => (
  <IntlProvider locale="en">
    <SpinnerComponent {...args} />
  </IntlProvider>
);

export const Spinner = Template.bind({});
