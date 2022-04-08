import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import AckeeSelectComponent from './ackee-select';

export default {
  title: 'Molecules/Forms',
  component: AckeeSelectComponent,
  argTypes: {
    initialValue: {
      control: {
        type: 'select',
      },
      description: 'Initial selected option.',
      options: ['full', 'partial'],
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof AckeeSelectComponent>;

const Template: ComponentStory<typeof AckeeSelectComponent> = (args) => (
  <IntlProvider locale="en">
    <AckeeSelectComponent {...args} />
  </IntlProvider>
);

export const AckeeSelect = Template.bind({});
AckeeSelect.args = {
  initialValue: 'full',
};
