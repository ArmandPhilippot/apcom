import CCBySA from '@components/atoms/icons/cc-by-sa';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import CopyrightComponent from './copyright';

export default {
  title: 'Atoms/Layout',
  component: CopyrightComponent,
  argTypes: {
    dates: {
      description: 'The copyright dates.',
      type: {
        name: 'object',
        required: true,
        value: {},
      },
    },
    icon: {
      control: {
        type: null,
      },
      description: 'The copyright icon.',
      type: {
        name: 'string',
        required: true,
      },
    },
    owner: {
      control: {
        type: 'text',
      },
      description: 'The copyright owner',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof CopyrightComponent>;

const Template: ComponentStory<typeof CopyrightComponent> = (args) => (
  <IntlProvider locale="en">
    <CopyrightComponent {...args} />
  </IntlProvider>
);

export const Copyright = Template.bind({});
Copyright.args = {
  dates: {
    start: '2012',
    end: '2022',
  },
  icon: <CCBySA />,
  owner: 'Your name',
};
