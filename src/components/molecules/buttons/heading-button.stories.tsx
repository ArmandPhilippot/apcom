import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import HeadingButtonComponent from './heading-button';

/**
 * HeadingButton - Storybook Meta
 */
export default {
  title: 'Molecules/Buttons/HeadingButton',
  component: HeadingButtonComponent,
  argTypes: {
    expanded: {
      control: {
        type: null,
      },
      description: 'Heading button state (plus or minus).',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    level: {
      control: {
        type: 'number',
        min: 1,
        max: 6,
      },
      description: 'Heading level.',
      type: {
        name: 'number',
        required: true,
      },
    },
    setExpanded: {
      control: {
        type: null,
      },
      description: 'Callback function to set heading button state.',
      type: {
        name: 'function',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'Heading title.',
      type: {
        name: 'string',
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
} as ComponentMeta<typeof HeadingButtonComponent>;

const Template: ComponentStory<typeof HeadingButtonComponent> = ({
  expanded,
  setExpanded: _setExpanded,
  ...args
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

  return (
    <HeadingButtonComponent
      expanded={isExpanded}
      setExpanded={setIsExpanded}
      {...args}
    />
  );
};

/**
 * Heading Button Stories - Level 1
 */
export const Level1 = Template.bind({});
Level1.args = {
  level: 1,
  title: 'Your title',
};

/**
 * Heading Button Stories - Level 2
 */
export const Level2 = Template.bind({});
Level2.args = {
  level: 2,
  title: 'Your title',
};

/**
 * Heading Button Stories - Level 3
 */
export const Level3 = Template.bind({});
Level3.args = {
  level: 3,
  title: 'Your title',
};

/**
 * Heading Button Stories - Level 4
 */
export const Level4 = Template.bind({});
Level4.args = {
  level: 4,
  title: 'Your title',
};

/**
 * Heading Button Stories - Level 5
 */
export const Level5 = Template.bind({});
Level5.args = {
  level: 5,
  title: 'Your title',
};

/**
 * Heading Button Stories - Level 6
 */
export const Level6 = Template.bind({});
Level6.args = {
  level: 6,
  title: 'Your title',
};
