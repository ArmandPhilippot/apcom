import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import BrandingComponent from './branding';

export default {
  title: 'Molecules/Layout',
  component: BrandingComponent,
  args: {
    isHome: false,
  },
  argTypes: {
    baseline: {
      control: {
        type: 'text',
      },
      description: 'The Branding baseline.',
      type: {
        name: 'string',
        required: false,
      },
    },
    isHome: {
      control: {
        type: 'boolean',
      },
      description: 'Use H1 if the current page is homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
    photo: {
      control: {
        type: 'text',
      },
      description: 'The Branding photo.',
      type: {
        name: 'string',
        required: true,
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'The Branding title.',
      type: {
        name: 'string',
        required: true,
      },
    },
    withLink: {
      control: {
        type: 'boolean',
      },
      description: 'Wraps the title with a link to homepage.',
      table: {
        category: 'Options',
        defaultValue: { summary: false },
      },
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
} as ComponentMeta<typeof BrandingComponent>;

const Template: ComponentStory<typeof BrandingComponent> = (args) => (
  <IntlProvider locale="en">
    <BrandingComponent {...args} />
  </IntlProvider>
);

export const Branding = Template.bind({});
Branding.args = {
  title: 'Website title',
  photo: 'http://placeimg.com/640/480',
};
