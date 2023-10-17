import type { ComponentMeta, ComponentStory } from '@storybook/react';
import NextImage from 'next/image';
import { Button, ButtonLink, Link, Time } from '../../atoms';
import { Card, type CardProps } from './card';
import { CardActions } from './card-actions';
import { CardBody } from './card-body';
import { CardCover } from './card-cover';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardMeta } from './card-meta';
import { CardTitle } from './card-title';

/**
 * Card - Storybook Meta
 */
export default {
  title: 'Molecules/Card',
  component: Card,
  argTypes: {},
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = <T extends string | undefined>(
  args: CardProps<T>
) => <Card {...args} />;

/**
 * Card Stories - Default
 */
export const Default = Template.bind({});
Default.args = {
  children: 'The card contents.',
};

/**
 * Card Stories - AsLink
 */
export const AsLink = Template.bind({});
AsLink.args = {
  'aria-label': 'Learn more about this card',
  children: 'The card contents.',
  linkTo: '#card',
};

export const HeaderCover = Template.bind({});
HeaderCover.args = {
  children: <CardHeader />,
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const HeaderTitle = Template.bind({});
HeaderTitle.args = {
  children: (
    <CardHeader>
      <CardTitle>The card title</CardTitle>
    </CardHeader>
  ),
};

export const HeaderMeta = Template.bind({});
HeaderMeta.args = {
  children: (
    <CardHeader>
      <CardMeta
        isInline
        items={[
          { id: 'author', label: 'Written by:', value: 'The author' },
          {
            id: 'publication-date',
            label: 'Published on:',
            value: <Time date={new Date().toISOString()} />,
          },
        ]}
      />
    </CardHeader>
  ),
};

export const BodyContents = Template.bind({});
BodyContents.args = {
  children: <CardBody>The card contents</CardBody>,
};

export const FooterActions = Template.bind({});
FooterActions.args = {
  children: (
    <CardFooter>
      <CardActions>
        <ButtonLink to="#post">Read more</ButtonLink>
        <Button>Share</Button>
      </CardActions>
    </CardFooter>
  ),
};

export const FooterMeta = Template.bind({});
FooterMeta.args = {
  children: <CardFooter />,
  meta: (
    <CardMeta
      items={[
        {
          id: 'categories',
          label: 'Categories:',
          value: [
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ],
        },
        {
          id: 'tags',
          label: 'Tags:',
          value: [
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ],
        },
      ]}
    />
  ),
};

export const CompositionCoverTitle = Template.bind({});
CompositionCoverTitle.args = {
  children: (
    <CardHeader>
      <CardTitle>The card title</CardTitle>
    </CardHeader>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const CompositionTitleMeta = Template.bind({});
CompositionTitleMeta.args = {
  children: (
    <CardHeader>
      <CardTitle>The card title</CardTitle>
      <CardMeta
        isInline
        items={[
          { id: 'author', label: 'Written by:', value: 'The author' },
          {
            id: 'publication-date',
            label: 'Published on:',
            value: <Time date={new Date().toISOString()} />,
          },
        ]}
      />
    </CardHeader>
  ),
};

export const CompositionCoverTitleMeta = Template.bind({});
CompositionCoverTitleMeta.args = {
  children: (
    <CardHeader>
      <CardTitle>The card title</CardTitle>
      <CardMeta
        isInline
        items={[
          { id: 'author', label: 'Written by:', value: 'The author' },
          {
            id: 'publication-date',
            label: 'Published on:',
            value: <Time date={new Date().toISOString()} />,
          },
        ]}
      />
    </CardHeader>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const CompositionTitleBody = Template.bind({});
CompositionTitleBody.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
    </>
  ),
};

export const CompositionCoverTitleBody = Template.bind({});
CompositionCoverTitleBody.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
    </>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const CompositionTitleMetaBody = Template.bind({});
CompositionTitleMetaBody.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
        <CardMeta
          isInline
          items={[
            { id: 'author', label: 'Written by:', value: 'The author' },
            {
              id: 'publication-date',
              label: 'Published on:',
              value: <Time date={new Date().toISOString()} />,
            },
          ]}
        />
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
    </>
  ),
};

export const CompositionCoverTitleMetaBody = Template.bind({});
CompositionCoverTitleMetaBody.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
        <CardMeta
          isInline
          items={[
            { id: 'author', label: 'Written by:', value: 'The author' },
            {
              id: 'publication-date',
              label: 'Published on:',
              value: <Time date={new Date().toISOString()} />,
            },
          ]}
        />
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
    </>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const CompositionTitleActions = Template.bind({});
CompositionTitleActions.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
};

export const CompositionCoverTitleActions = Template.bind({});
CompositionCoverTitleActions.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
};

export const CompositionTitleBodyActions = Template.bind({});
CompositionTitleBodyActions.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
};

export const CompositionTitleBodyActionsMeta = Template.bind({});
CompositionTitleBodyActionsMeta.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
  meta: (
    <CardMeta
      items={[
        {
          id: 'categories',
          label: 'Categories:',
          value: [
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ],
        },
        {
          id: 'tags',
          label: 'Tags:',
          value: [
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ],
        },
      ]}
    />
  ),
};

export const CompositionCoverTitleBodyActionsMeta = Template.bind({});
CompositionCoverTitleBodyActionsMeta.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
  meta: (
    <CardMeta
      items={[
        {
          id: 'categories',
          label: 'Categories:',
          value: [
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ],
        },
        {
          id: 'tags',
          label: 'Tags:',
          value: [
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ],
        },
      ]}
    />
  ),
};

export const CompositionAllContents = Template.bind({});
CompositionAllContents.args = {
  children: (
    <>
      <CardHeader>
        <CardTitle>The card title</CardTitle>
        <CardMeta
          isInline
          items={[
            { id: 'author', label: 'Written by:', value: 'The author' },
            {
              id: 'publication-date',
              label: 'Published on:',
              value: <Time date={new Date().toISOString()} />,
            },
          ]}
        />
      </CardHeader>
      <CardBody>
        Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
        necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
        velit veritatis nihil. Ratione aperiam omnis quia ut asperiores tenetur
        dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
      </CardBody>
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    </>
  ),
  cover: (
    <CardCover>
      <NextImage
        alt="A cover example"
        height={480}
        src="https://picsum.photos/640/480"
        width={640}
      />
    </CardCover>
  ),
  meta: (
    <CardMeta
      items={[
        {
          id: 'categories',
          label: 'Categories:',
          value: [
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ],
        },
        {
          id: 'tags',
          label: 'Tags:',
          value: [
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ],
        },
      ]}
    />
  ),
};
