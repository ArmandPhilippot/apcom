import { describe, expect, it } from '@jest/globals';
import { render, screen } from '../../../../tests/utils';
import { SharingLink } from './sharing-link';

describe('SharingLink', () => {
  it('render a Diaspora sharing link', () => {
    render(<SharingLink medium="diaspora" url="#" />);
    expect(screen.getByRole('link', { name: 'Share on diaspora' })).toHaveClass(
      'link--diaspora'
    );
  });

  it('render an Email sharing link', () => {
    render(<SharingLink medium="email" url="#" />);
    expect(screen.getByRole('link', { name: 'Share on email' })).toHaveClass(
      'link--email'
    );
  });

  it('render a Facebook sharing link', () => {
    render(<SharingLink medium="facebook" url="#" />);
    expect(screen.getByRole('link', { name: 'Share on facebook' })).toHaveClass(
      'link--facebook'
    );
  });

  it('render a Journal du Hacker sharing link', () => {
    render(<SharingLink medium="journal-du-hacker" url="#" />);
    expect(
      screen.getByRole('link', { name: 'Share on journal-du-hacker' })
    ).toHaveClass('link--journal-du-hacker');
  });

  it('render a LinkedIn sharing link', () => {
    render(<SharingLink medium="linkedin" url="#" />);
    expect(screen.getByRole('link', { name: 'Share on linkedin' })).toHaveClass(
      'link--linkedin'
    );
  });

  it('render a Twitter sharing link', () => {
    render(<SharingLink medium="twitter" url="#" />);
    expect(screen.getByRole('link', { name: 'Share on twitter' })).toHaveClass(
      'link--twitter'
    );
  });
});
