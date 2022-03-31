import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import CCBySAIcon from './cc-by-sa';

export default {
  title: 'Atoms/Icons',
  component: CCBySAIcon,
} as ComponentMeta<typeof CCBySAIcon>;

const Template: ComponentStory<typeof CCBySAIcon> = (args) => (
  <IntlProvider locale="en">
    <CCBySAIcon {...args} />
  </IntlProvider>
);

export const CCBySA = Template.bind({});
