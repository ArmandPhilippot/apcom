import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import PrismThemeToggleComponent from './prism-theme-toggle';

export default {
  title: 'Molecules/Forms',
  component: PrismThemeToggleComponent,
  argTypes: {
    value: {
      control: {
        type: null,
      },
      description: 'The prism theme value.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof PrismThemeToggleComponent>;

const Template: ComponentStory<typeof PrismThemeToggleComponent> = (args) => (
  <IntlProvider locale="en">
    <PrismThemeToggleComponent {...args} />
  </IntlProvider>
);

export const PrismThemeToggle = Template.bind({});
PrismThemeToggle.args = {
  value: false,
};
