import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { SharingLink, type SharingMedium } from './sharing-link';

describe('SharingLink', () => {
  it('render a Diaspora sharing link', () => {
    const label = 'ab';
    const medium: SharingMedium = 'diaspora';
    const target = '/totam';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--diaspora');
  });

  it('render an Email sharing link', () => {
    const label = 'ut';
    const medium: SharingMedium = 'email';
    const target = '/nostrum';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--email');
  });

  it('render a Facebook sharing link', () => {
    const label = 'autem';
    const medium: SharingMedium = 'facebook';
    const target = '/perspiciatis';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--facebook');
  });

  it('render a Journal du Hacker sharing link', () => {
    const label = 'in';
    const medium: SharingMedium = 'journal-du-hacker';
    const target = '/labore';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--journal-du-hacker');
  });

  it('render a LinkedIn sharing link', () => {
    const label = 'id';
    const medium: SharingMedium = 'linkedin';
    const target = '/nesciunt';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--linkedin');
  });

  it('render a Twitter sharing link', () => {
    const label = 'illum';
    const medium: SharingMedium = 'twitter';
    const target = '/consectetur';

    render(<SharingLink label={label} medium={medium} url={target} />);

    const link = rtlScreen.getByRole('link', { name: label });

    expect(link).toHaveAttribute('href', target);
    expect(link).toHaveClass('link--twitter');
  });
});
