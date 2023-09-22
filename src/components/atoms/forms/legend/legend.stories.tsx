import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Legend as LegendComponent } from './legend';
import { Fieldset } from '../fieldset';

/**
 * Legend - Storybook Meta
 */
export default {
  title: 'Atoms/Forms',
  component: LegendComponent,
  args: {},
  argTypes: {},
} as ComponentMeta<typeof LegendComponent>;

const Template: ComponentStory<typeof LegendComponent> = (args) => (
  <Fieldset>
    <LegendComponent {...args} />
  </Fieldset>
);

/**
 * Legend Story
 */
export const Legend = Template.bind({});
Legend.args = {
  children: 'A fieldset legend',
};
