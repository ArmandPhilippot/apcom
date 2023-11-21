import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('renders the website header', () => {
    render(<SiteHeader />);

    expect(rtlScreen.getByRole('banner')).toBeInTheDocument();
  });
});
