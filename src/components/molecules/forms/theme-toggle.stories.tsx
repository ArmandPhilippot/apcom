import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ThemeToggleComponent from './theme-toggle';

export default {
  title: 'Molecules/Forms',
  component: ThemeToggleComponent,
} as ComponentMeta<typeof ThemeToggleComponent>;

const Template: ComponentStory<typeof ThemeToggleComponent> = (args) => (
  <IntlProvider locale="en">
    <ThemeToggleComponent {...args} />
  </IntlProvider>
);

export const ThemeToggle = Template.bind({});
