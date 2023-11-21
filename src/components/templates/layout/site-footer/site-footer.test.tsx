import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { CONFIG } from '../../../../utils/config';
import { ROUTES } from '../../../../utils/constants';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('renders the website colophon', () => {
    render(<SiteFooter />);

    expect(rtlScreen.getByRole('contentinfo')).toBeInTheDocument();
    expect(rtlScreen.getByText(CONFIG.copyright.startYear)).toBeInTheDocument();
    expect(rtlScreen.getByText(CONFIG.copyright.endYear)).toBeInTheDocument();
    expect(rtlScreen.getByText(new RegExp(CONFIG.name))).toBeInTheDocument();
    expect(rtlScreen.getByTitle('CC BY SA')).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('link', { name: 'Legal notice' })
    ).toHaveAttribute('href', ROUTES.LEGAL_NOTICE);
  });
});
