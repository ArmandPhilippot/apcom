import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToCWidget from './table-of-contents';

/**
 * TableOfContents - Storybook Meta
 */
export default {
  title: 'Organisms/Widgets',
  component: ToCWidget,
  argTypes: {
    wrapper: {
      control: {
        type: null,
      },
      description:
        'A reference to the HTML element that contains the headings.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ToCWidget>;

const Template: ComponentStory<typeof ToCWidget> = (args) => (
  <ToCWidget {...args} />
);

export const GetWrapper = () => {
  const wrapper = document.createElement('div');
  const firstTitle = document.createElement('h2');
  const firstParagraph = document.createElement('p');
  const secondTitle = document.createElement('h2');
  const secondParagraph = document.createElement('p');

  firstTitle.textContent = 'dignissimos odit odit';
  firstParagraph.textContent =
    'Sint error saepe in. Vel doloribus facere deleniti minima magni. Consequatur veniam quia rerum praesentium eaque culpa culpa quas optio.';
  secondTitle.textContent = 'aliquam exercitationem ut';
  secondParagraph.textContent =
    'Doloribus sunt ut pariatur et praesentium rerum quam deserunt. Quod omnis quia qui quis debitis recusandae. Voluptate et impedit quam quidem quis id explicabo similique enim. Velit illum amet quos veniam consequatur amet nam sunt et. Et odit atque totam culpa officia saepe sed eaque consequatur.';

  wrapper.append(...[firstTitle, firstParagraph, secondTitle, secondParagraph]);

  return wrapper;
};

/**
 * Widgets Stories - Table of Contents
 */
export const TableOfContents = Template.bind({});
TableOfContents.args = {
  wrapper: GetWrapper(),
};
