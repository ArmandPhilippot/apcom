import ResponsiveImage from '@components/molecules/images/responsive-image';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Gallery from './gallery';

/**
 * Gallery - Storybook Meta
 */
export default {
  title: 'Organisms/Images/Gallery',
  component: Gallery,
  argTypes: {
    children: {
      control: {
        type: null,
      },
      description: 'Two or more ResponsiveImage component.',
      type: {
        name: 'function',
        required: true,
      },
    },
    columns: {
      control: {
        type: 'number',
        min: 2,
        max: 4,
      },
      description: 'The columns count.',
      type: {
        name: 'number',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof Gallery>;

const image = {
  alt: 'Modi provident omnis',
  height: 480,
  src: 'http://placeimg.com/640/480/fashion',
  width: 640,
};

const Template: ComponentStory<typeof Gallery> = (args) => (
  <Gallery {...args}>
    <ResponsiveImage {...image} />
    <ResponsiveImage {...image} />
    <ResponsiveImage {...image} />
    <ResponsiveImage {...image} />
  </Gallery>
);

/**
 * Gallery Stories - Two columns
 */
export const TwoColumns = Template.bind({});
TwoColumns.args = {
  columns: 2,
};

/**
 * Gallery Stories - Three columns
 */
export const ThreeColumns = Template.bind({});
ThreeColumns.args = {
  columns: 3,
};

/**
 * Gallery Stories - Four columns
 */
export const FourColumns = Template.bind({});
FourColumns.args = {
  columns: 4,
};
