import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import MotionToggleComponent from './motion-toggle';

/**
 * MotionToggle - Storybook Meta
 */
export default {
  title: 'Molecules/Forms/Toggle',
  component: MotionToggleComponent,
  argTypes: {
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
  decorators: [
    (Story) => (
      <IntlProvider locale="en">
        <Story />
      </IntlProvider>
    ),
  ],
} as ComponentMeta<typeof MotionToggleComponent>;

const Template: ComponentStory<typeof MotionToggleComponent> = (args) => (
  <MotionToggleComponent {...args} />
);

/**
 * Toggle Stories - Motion
 */
export const Motion = Template.bind({});
Motion.args = {
  value: false,
};
