import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import MotionToggleComponent from './motion-toggle';

export default {
  title: 'Molecules/Forms',
  component: MotionToggleComponent,
} as ComponentMeta<typeof MotionToggleComponent>;

const Template: ComponentStory<typeof MotionToggleComponent> = (args) => (
  <IntlProvider locale="en">
    <MotionToggleComponent {...args} />
  </IntlProvider>
);

export const MotionToggle = Template.bind({});
