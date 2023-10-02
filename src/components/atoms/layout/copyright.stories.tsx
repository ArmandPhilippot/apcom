import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Icon } from '../images/icons';
import { Copyright as CopyrightComponent } from './copyright';

/**
 * Copyright - Storybook Meta
 */
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
  <CopyrightComponent {...args} />
);

/**
 * Layout Stories - Copyright
 */
export const Copyright = Template.bind({});
Copyright.args = {
  dates: {
    start: '2012',
    end: '2022',
  },
  icon: <Icon shape="cc-by-sa" />,
  owner: 'Your name',
};
