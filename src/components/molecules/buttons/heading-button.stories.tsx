import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { HeadingButton as HeadingButtonComponent } from './heading-button';

/**
 * HeadingButton - Storybook Meta
 */
export default {
  title: 'Molecules/Buttons/HeadingButton',
  component: HeadingButtonComponent,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
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
 * Heading Button Stories - Expanded
 */
export const Expanded = Template.bind({});
Expanded.args = {
  expanded: true,
  level: 2,
  title: 'Your title',
};

/**
 * Heading Button Stories - Collapsed
 */
export const Collapsed = Template.bind({});
Collapsed.args = {
  expanded: false,
  level: 2,
  title: 'Your title',
};
