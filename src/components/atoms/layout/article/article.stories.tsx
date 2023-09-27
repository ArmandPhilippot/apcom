import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Article as ArticleComponent } from './article';

/**
 * Article - Storybook Meta
 */
export default {
  title: 'Atoms/Layout',
  component: ArticleComponent,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      description: 'The contents.',
      type: {
        name: 'string',
        required: true,
      },
    },
  },
} as ComponentMeta<typeof ArticleComponent>;

const Template: ComponentStory<typeof ArticleComponent> = (args) => (
  <ArticleComponent {...args} />
);

/**
 * Layout Stories - Article
 */
export const Article = Template.bind({});
Article.args = {
  children: 'The article content.',
};
