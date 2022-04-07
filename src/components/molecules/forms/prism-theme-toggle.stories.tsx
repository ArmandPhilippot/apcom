import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import PrismThemeToggleComponent from './prism-theme-toggle';

export default {
  title: 'Molecules/Forms',
  component: PrismThemeToggleComponent,
} as ComponentMeta<typeof PrismThemeToggleComponent>;

const Template: ComponentStory<typeof PrismThemeToggleComponent> = (args) => (
  <IntlProvider locale="en">
    <PrismThemeToggleComponent {...args} />
  </IntlProvider>
);

export const PrismThemeToggle = Template.bind({});
