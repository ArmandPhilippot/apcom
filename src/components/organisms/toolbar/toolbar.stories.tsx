import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import ToolbarComponent from './toolbar';

export default {
  title: 'Organisms/Toolbar',
  component: ToolbarComponent,
} as ComponentMeta<typeof ToolbarComponent>;

const Template: ComponentStory<typeof ToolbarComponent> = (args) => (
  <IntlProvider locale="en">
    <ToolbarComponent {...args} />
  </IntlProvider>
);

const nav = [
  { id: 'home-link', href: '#', label: 'Home' },
  { id: 'blog-link', href: '#', label: 'Blog' },
  { id: 'cv-link', href: '#', label: 'CV' },
  { id: 'contact-link', href: '#', label: 'Contact' },
];

export const Toolbar = Template.bind({});
Toolbar.args = {
  nav,
};
