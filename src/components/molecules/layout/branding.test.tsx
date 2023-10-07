import { describe, expect, it } from '@jest/globals';
import NextImage from 'next/image';
import { render, screen as rtlScreen } from '../../../../tests/utils';
import { Logo } from '../../atoms';
import { Branding } from './branding';

describe('Branding', () => {
  it('renders a photo', () => {
    const altText = 'A photo example';

    render(
      <Branding
        logo={<Logo />}
        photo={
          <NextImage
            alt="A photo example"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        title="Website title"
      />
    );
    expect(rtlScreen.getByRole('img', { name: altText })).toBeInTheDocument();
  });

  it('renders a logo', () => {
    const logoHeading = 'sed enim voluptatem';

    render(
      <Branding
        logo={<Logo heading={logoHeading} />}
        photo={
          <NextImage
            alt="A photo example"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        title="Website name"
      />
    );
    expect(rtlScreen.getByTitle(logoHeading)).toBeInTheDocument();
  });

  it('renders a baseline', () => {
    render(
      <Branding
        logo={<Logo />}
        photo={
          <NextImage
            alt="A photo example"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        title="Website title"
        baseline="Website baseline"
      />
    );
    expect(rtlScreen.getByText('Website baseline')).toBeInTheDocument();
  });

  it('renders a title wrapped with h1 element', () => {
    render(
      <Branding
        logo={<Logo />}
        photo={
          <NextImage
            alt="A photo example"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        title="Website title"
        isHome={true}
      />
    );
    expect(
      rtlScreen.getByRole('heading', { level: 1, name: 'Website title' })
    ).toBeInTheDocument();
  });

  it('renders a title with h1 styles', () => {
    render(
      <Branding
        logo={<Logo />}
        photo={
          <NextImage
            alt="A photo example"
            height={200}
            src="https://picsum.photos/200"
            width={200}
          />
        }
        title="Website title"
        isHome={false}
      />
    );
    expect(
      rtlScreen.queryByRole('heading', { level: 1, name: 'Website title' })
    ).not.toBeInTheDocument();
    expect(rtlScreen.getByText('Website title')).toHaveClass('heading--1');
  });
});
