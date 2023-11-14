import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { Heading, type SharingMedium } from '../../../atoms';
import { SharingWidget, type SharingData } from './sharing-widget';

const data: SharingData = {
  excerpt: 'A post excerpt',
  title: 'A post title',
  url: 'https://sharing-website.test',
};

describe('SharingWidget', () => {
  it('renders the widget heading and a list of links', () => {
    const heading = 'dolorem necessitatibus voluptatem';
    const headingLvl = 3;
    const media = ['facebook', 'twitter'] satisfies SharingMedium[];

    render(
      <SharingWidget
        data={data}
        heading={<Heading level={headingLvl}>{heading}</Heading>}
        media={media}
      />
    );

    expect(
      rtlScreen.getByRole('heading', { level: headingLvl })
    ).toHaveTextContent(heading);
    expect(rtlScreen.getAllByRole('listitem')).toHaveLength(media.length);
    expect(rtlScreen.getAllByRole('link')).toHaveLength(media.length);
  });

  it('can render a link to share on Diaspora', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['diaspora']}
      />
    );

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveTextContent('Share on Diaspora');
    expect(link).toHaveAttribute(
      'href',
      `https://share.diasporafoundation.org/?title=${encodeURIComponent(
        data.title
      )}&url=${encodeURIComponent(data.url)}`
    );
  });

  it('can render a link to share on Facebook', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['facebook']}
      />
    );

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveTextContent('Share on Facebook');
    expect(link).toHaveAttribute(
      'href',
      `https://www.facebook.com/sharer/sharer.php?$u=${encodeURIComponent(
        data.url
      )}`
    );
  });

  it('can render a link to share on Journal du Hacker', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['journal-du-hacker']}
      />
    );

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveTextContent('Share on Journal du Hacker');
    expect(link).toHaveAttribute(
      'href',
      `https://www.journalduhacker.net/stories/new?title=${encodeURIComponent(
        data.title
      )}&url=${encodeURIComponent(data.url)}`
    );
  });

  it('can render a link to share on LinkedIn', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['linkedin']}
      />
    );

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveTextContent('Share on LinkedIn');
    expect(link).toHaveAttribute(
      'href',
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        data.url
      )}`
    );
  });

  it('can render a link to share on Twitter', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['twitter']}
      />
    );

    const link = rtlScreen.getByRole('link');

    expect(link).toHaveTextContent('Share on Twitter');
    expect(link).toHaveAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        data.title
      )}&url=${encodeURIComponent(data.url)}`
    );
  });

  it('can render a link to share by Email', () => {
    render(
      <SharingWidget
        data={data}
        heading={<Heading level={3}>corrupti</Heading>}
        media={['email']}
      />
    );

    const link = rtlScreen.getByRole('link');
    const subject = `You should read ${data.title}`;
    const body = `${data.excerpt}\n\nRead more here: ${data.url}`;

    expect(link).toHaveTextContent('Share by Email');
    expect(link).toHaveAttribute(
      'href',
      `mailto:?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(
        subject
      )}`
    );
  });

  it('throws an error when a medium is invalid', () => {
    expect(() =>
      render(
        <SharingWidget
          data={data}
          heading={<Heading level={3}>maxime</Heading>}
          // @ts-expect-error -- Unsupported medium
          media={['not-supported']}
        />
      )
    ).toThrowError('Unsupported social media.');
  });
});
