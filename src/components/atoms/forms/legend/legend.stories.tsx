import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Fieldset } from '../fieldset';
import { Legend as LegendComponent } from './legend';

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
