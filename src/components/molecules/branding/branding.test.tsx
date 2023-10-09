import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import NextImage from 'next/image';
import { Branding } from './branding';

describe('Branding', () => {
  it('renders the brand logo and name', () => {
    const altText = 'dolorem aut ullam';
    const name = 'ducimus quo enim';

    render(
      <Branding
        logo={
          <NextImage
            alt={altText}
            height={100}
            src="https://picsum.photos/100"
            width={100}
          />
        }
        name={<div>{name}</div>}
      />
    );

    expect(rtlScreen.getByRole('img', { name: altText })).toBeInTheDocument();
    expect(rtlScreen.getByText(name)).toBeInTheDocument();
  });

  it('can render the brand logo, name and baseline', () => {
    const altText = 'dolorem aut ullam';
    const name = 'ducimus quo enim';
    const baseline = 'ab consequatur est';

    render(
      <Branding
        baseline={<div>{baseline}</div>}
        logo={
          <NextImage
            alt={altText}
            height={100}
            src="https://picsum.photos/100"
            width={100}
          />
        }
        name={<div>{name}</div>}
      />
    );

    expect(rtlScreen.getByRole('img', { name: altText })).toBeInTheDocument();
    expect(rtlScreen.getByText(name)).toBeInTheDocument();
    expect(rtlScreen.getByText(baseline)).toBeInTheDocument();
  });

  it('can render the brand name wrapped in a link', () => {
    const altText = 'dolorem aut ullam';
    const name = 'ducimus quo enim';
    const url = '/velit';

    render(
      <Branding
        logo={
          <NextImage
            alt={altText}
            height={100}
            src="https://picsum.photos/100"
            width={100}
          />
        }
        name={<div>{name}</div>}
        url={url}
      />
    );

    expect(rtlScreen.getByRole('img', { name: altText })).toBeInTheDocument();
    expect(rtlScreen.getByRole('link', { name })).toHaveAttribute('href', url);
  });
});
