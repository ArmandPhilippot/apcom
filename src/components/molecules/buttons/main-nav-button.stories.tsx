import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import MainNavButtonComponent from './main-nav-button';

export default {
  title: 'Molecules/Buttons',
  component: MainNavButtonComponent,
  argTypes: {
    checkboxClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the checkbox.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    isActive: {
      control: {
        type: null,
      },
      description: 'The button state.',
      type: {
        name: 'boolean',
        required: true,
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the label.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    setIsActive: {
      control: {
        type: null,
      },
      description: 'A callback function to set the button state.',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof MainNavButtonComponent>;

const Template: ComponentStory<typeof MainNavButtonComponent> = ({
  isActive,
  setIsActive: _setIsActive,
  ...args
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(isActive);

  return (
    <IntlProvider locale="en">
      <MainNavButtonComponent
        isActive={isChecked}
        setIsActive={setIsChecked}
        {...args}
      />
    </IntlProvider>
  );
};

export const MainNavButton = Template.bind({});
MainNavButton.args = {
  isActive: false,
};
