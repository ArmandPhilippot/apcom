import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import MotionToggleComponent from './motion-toggle';

export default {
  title: 'Molecules/Forms',
  component: MotionToggleComponent,
  argTypes: {
    value: {
      control: {
        type: null,
      },
      description: 'The reduce motion value.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MotionToggleComponent>;

const Template: ComponentStory<typeof MotionToggleComponent> = (args) => (
  <IntlProvider locale="en">
    <MotionToggleComponent {...args} />
  </IntlProvider>
);

export const MotionToggle = Template.bind({});
MotionToggle.args = {
  value: false,
};
