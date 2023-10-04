import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { BackToTop as BackToTopComponent } from './back-to-top';

/**
 * BackToTop - Storybook Meta
 */
export default {
  title: 'Molecules/Buttons',
  component: BackToTopComponent,
  argTypes: {
    anchor: {
      control: {
        type: 'text',
      },
      description: 'An element id with leading hashtag to use as anchor.',
      type: {
        name: 'string',
        required: true,
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Set additional classnames to the button wrapper.',
      table: {
        category: 'Styles',
      },
      type: {
        name: 'string',
        required: false,
      },
    },
    label: {
      control: {
        type: 'text',
      },
      description: 'An accessible name for the button.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof BackToTopComponent>;

const Template: ComponentStory<typeof BackToTopComponent> = (args) => (
  <BackToTopComponent {...args} />
);

/**
 * Buttons Stories - Back to top
 */
export const BackToTop = Template.bind({});
BackToTop.args = {
  anchor: '#top',
  label: 'Back to top',
};
