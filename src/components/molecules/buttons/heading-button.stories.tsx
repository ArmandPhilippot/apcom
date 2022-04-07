import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import HeadingButtonComponent from './heading-button';

export default {
  title: 'Molecules/Buttons',
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
    <IntlProvider locale="en">
      <HeadingButtonComponent
        expanded={isExpanded}
        setExpanded={setIsExpanded}
        {...args}
      />
    </IntlProvider>
  );
};

export const HeadingButton = Template.bind({});
HeadingButton.args = {
  level: 2,
  title: 'Your title',
};
