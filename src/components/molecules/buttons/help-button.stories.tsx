import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import HelpButtonComponent from './help-button';

export default {
  title: 'Molecules/Buttons',
  component: HelpButtonComponent,
} as ComponentMeta<typeof HelpButtonComponent>;

const Template: ComponentStory<typeof HelpButtonComponent> = (args) => (
  <IntlProvider locale="en">
    <HelpButtonComponent {...args} />
  </IntlProvider>
);

export const HelpButton = Template.bind({});
