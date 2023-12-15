import type { Meta, StoryObj } from '@storybook/react';
import NextImage from 'next/image';
import { Button, ButtonLink, Link, Time } from '../../atoms';
import { MetaItem } from '../meta-list';
import { Card } from './card';
import { CardActions } from './card-actions';
import { CardBody } from './card-body';
import { CardCover } from './card-cover';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardMeta } from './card-meta';
import { CardTitle } from './card-title';

const meta = {
  component: Card,
  title: 'Molecules/Card',
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The card contents.',
  },
};

export const AsLink: Story = {
  args: {
    'aria-label': 'Learn more about this card',
    children: 'The card contents.',
    linkTo: '#card',
  },
};

export const HeaderCover: Story = {
  args: {
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
  },
};

export const HeaderTitle: Story = {
  args: {
    children: (
      <CardHeader>
        <CardTitle>The card title</CardTitle>
      </CardHeader>
    ),
  },
};

export const HeaderMeta: Story = {
  args: {
    children: (
      <CardHeader>
        <CardMeta isInline>
          <MetaItem label="Written by:" value="The author" />
          <MetaItem
            label="Published on:"
            value={<Time date={new Date().toISOString()} />}
          />
        </CardMeta>
      </CardHeader>
    ),
  },
};

export const BodyContents: Story = {
  args: {
    children: <CardBody>The card contents</CardBody>,
  },
};

export const FooterActions: Story = {
  args: {
    children: (
      <CardFooter>
        <CardActions>
          <ButtonLink to="#post">Read more</ButtonLink>
          <Button>Share</Button>
        </CardActions>
      </CardFooter>
    ),
  },
};

export const FooterMeta: Story = {
  args: {
    children: <CardFooter />,
    meta: (
      <CardMeta>
        <MetaItem
          label="Categories:"
          value={[
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ]}
        />
        <MetaItem
          label="Tags:"
          value={[
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ]}
        />
      </CardMeta>
    ),
  },
};

export const CompositionCoverTitle: Story = {
  args: {
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
  },
};

export const CompositionTitleMeta: Story = {
  args: {
    children: (
      <CardHeader>
        <CardTitle>The card title</CardTitle>
        <CardMeta isInline>
          <MetaItem label="Written by:" value="The author" />
          <MetaItem
            label="Published on:"
            value={<Time date={new Date().toISOString()} />}
          />
        </CardMeta>
      </CardHeader>
    ),
  },
};

export const CompositionCoverTitleMeta: Story = {
  args: {
    children: (
      <CardHeader>
        <CardTitle>The card title</CardTitle>
        <CardMeta isInline>
          <MetaItem label="Written by:" value="The author" />
          <MetaItem
            label="Published on:"
            value={<Time date={new Date().toISOString()} />}
          />
        </CardMeta>
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
  },
};

export const CompositionTitleBody: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
        </CardBody>
      </>
    ),
  },
};

export const CompositionCoverTitleBody: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
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
  },
};

export const CompositionTitleMetaBody: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
          <CardMeta isInline>
            <MetaItem label="Written by:" value="The author" />
            <MetaItem
              label="Published on:"
              value={<Time date={new Date().toISOString()} />}
            />
          </CardMeta>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
        </CardBody>
      </>
    ),
  },
};

export const CompositionCoverTitleMetaBody: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
          <CardMeta isInline>
            <MetaItem label="Written by:" value="The author" />
            <MetaItem
              label="Published on:"
              value={<Time date={new Date().toISOString()} />}
            />
          </CardMeta>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
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
  },
};

export const CompositionTitleActions: Story = {
  args: {
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
  },
};

export const CompositionCoverTitleActions: Story = {
  args: {
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
  },
};

export const CompositionTitleBodyActions: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
        </CardBody>
        <CardFooter>
          <CardActions>
            <ButtonLink to="#post">Read more</ButtonLink>
            <Button>Share</Button>
          </CardActions>
        </CardFooter>
      </>
    ),
  },
};

export const CompositionTitleBodyActionsMeta: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
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
      <CardMeta>
        <MetaItem
          label="Categories:"
          value={[
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ]}
        />
        <MetaItem
          label="Tags:"
          value={[
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ]}
        />
      </CardMeta>
    ),
  },
};

export const CompositionCoverTitleBodyActionsMeta: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
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
      <CardMeta>
        <MetaItem
          label="Categories:"
          value={[
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ]}
        />
        <MetaItem
          label="Tags:"
          value={[
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ]}
        />
      </CardMeta>
    ),
  },
};

export const CompositionAllContents: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>The card title</CardTitle>
          <CardMeta isInline>
            <MetaItem label="Written by:" value="The author" />
            <MetaItem
              label="Published on:"
              value={<Time date={new Date().toISOString()} />}
            />
          </CardMeta>
        </CardHeader>
        <CardBody>
          Nihil magnam tempora voluptatem. Reiciendis ut cum vel. Odit et
          necessitatibus esse laudantium sequi ad. Et est quas pariatur facere
          velit veritatis nihil. Ratione aperiam omnis quia ut asperiores
          tenetur dolores veniam. Nostrum est ullam aliquam aliquid expedita ea.
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
      <CardMeta>
        <MetaItem
          label="Categories:"
          value={[
            { id: 'cat-1', value: <Link href="#cat1">Category 1</Link> },
            { id: 'cat-2', value: <Link href="#cat2">Category 2</Link> },
          ]}
        />
        <MetaItem
          label="Tags:"
          value={[
            { id: 'tag-1', value: 'Tag 1' },
            { id: 'tag-2', value: 'Tag 2' },
            { id: 'tag-3', value: 'Tag 3' },
          ]}
        />
      </CardMeta>
    ),
  },
};
