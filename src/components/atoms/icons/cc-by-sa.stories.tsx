import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import CCBySAIcon from './cc-by-sa';

/**
 * CC BY SA icon - Storybook Meta
 */
export default {
  title: 'Atoms/Illustrations/Icons',
  component: CCBySAIcon,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
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
} as ComponentMeta<typeof CCBySAIcon>;

const Template: ComponentStory<typeof CCBySAIcon> = (args) => (
  <CCBySAIcon {...args} />
);

/**
 * Icons Stories - CC BY SA
 */
export const CCBySA = Template.bind({});
