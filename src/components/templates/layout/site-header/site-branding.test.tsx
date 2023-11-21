import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '../../../../../tests/utils';
import { SiteBranding } from './site-branding';
import { CONFIG } from 'src/utils/config';
import { ROUTES } from 'src/utils/constants';

describe('SiteBranding', () => {
  it('renders the website logo, name and baseline', () => {
    render(<SiteBranding />);

    expect(
      rtlScreen.getByRole('img', { name: `${CONFIG.name} picture` })
    ).toBeInTheDocument();
    expect(
      rtlScreen.getByRole('img', { name: `${CONFIG.name} logo` })
    ).toBeInTheDocument();
    expect(rtlScreen.getByRole('link', { name: CONFIG.name })).toHaveAttribute(
      'href',
      ROUTES.HOME
    );
    expect(rtlScreen.getByText(CONFIG.baseline)).toBeInTheDocument();
  });
});
