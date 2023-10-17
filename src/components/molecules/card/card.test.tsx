import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { Card } from './card';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardMeta } from './card-meta';

describe('Card', () => {
  it('renders its children', () => {
    const body = 'eveniet error voluptas';

    render(<Card>{body}</Card>);

    expect(rtlScreen.getByText(body)).toBeInTheDocument();
  });

  it('can render a cover in the card header', () => {
    const altTxt = 'quo expedita eveniet';

    render(
      <Card
        cover={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
      >
        <CardHeader />
      </Card>
    );

    expect(rtlScreen.getByRole('img', { name: altTxt })).toBeInTheDocument();
  });

  it('does not render a cover without card header', () => {
    const body = 'necessitatibus maiores sed';
    const altTxt = 'quo expedita eveniet';

    render(
      <Card
        cover={
          <NextImage
            alt={altTxt}
            height={480}
            src="https://picsum.photos/640/480"
            width={640}
          />
        }
      >
        {body}
      </Card>
    );

    expect(
      rtlScreen.queryByRole('img', { name: altTxt })
    ).not.toBeInTheDocument();
  });

  it('can render some meta in the card footer', () => {
    const term = 'ut';
    const desc = 'repudiandae';

    render(
      <Card
        meta={<CardMeta items={[{ id: 'any', label: term, value: desc }]} />}
      >
        <CardFooter />
      </Card>
    );

    expect(rtlScreen.getByRole('term')).toHaveTextContent(term);
    expect(rtlScreen.getByRole('definition')).toHaveTextContent(desc);
  });

  it('does not render the meta without card footer', () => {
    const body = 'rerum dolore et';
    const term = 'ut';
    const desc = 'repudiandae';

    render(
      <Card
        meta={<CardMeta items={[{ id: 'any', label: term, value: desc }]} />}
      >
        {body}
      </Card>
    );

    expect(
      rtlScreen.queryByRole('term', { name: term })
    ).not.toBeInTheDocument();
    expect(
      rtlScreen.queryByRole('definition', { name: desc })
    ).not.toBeInTheDocument();
  });

  it('can render a card as link to another page', () => {
    const body = 'Et qui harum voluptas est quos qui.';
    const cta = 'asperiores optio incidunt';
    const target = '#molestiae';

    render(
      <Card aria-label={cta} linkTo={target}>
        {body}
      </Card>
    );

    expect(rtlScreen.getByRole('link', { name: cta })).toHaveAttribute(
      'href',
      target
    );
  });

  it('can render a card with centered text', () => {
    const body = 'Et qui harum voluptas est quos qui.';
    const label = 'asperiores optio incidunt';

    render(
      <Card aria-label={label} isCentered>
        {body}
      </Card>
    );

    expect(rtlScreen.getByLabelText(label)).toHaveClass('wrapper--centered');
  });
});
